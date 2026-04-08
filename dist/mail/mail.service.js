"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailService = MailService_1 = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            port: 465,
            secure: true,
            auth: {
                user: 'resend',
                pass: this.configService.get('MAIL_PASS'),
            },
            connectionTimeout: 10000,
            options: {
                family: 4
            }
        });
    }
    async sendVerificationEmail(email, code) {
        const from = 'onboarding@resend.dev';
        try {
            await this.transporter.sendMail({
                from: `"Qupedia Support" <${from}>`,
                to: email,
                subject: 'Email Verification Code',
                html: `
          <div style="font-family: Arial; text-align: center; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #333;">Welcome to Qupedia!</h2>
            <p>Your verification code is:</p>
            <h1 style="color: #4A90E2; font-size: 40px; letter-spacing: 5px;">${code}</h1>
            <p>This code expires in 10 minutes.</p>
          </div>
        `,
            });
            this.logger.log(`✅ Email sent successfully via Resend to ${email}`);
        }
        catch (error) {
            this.logger.error(`❌ Resend Failed: ${error.message}`);
        }
    }
    async sendPasswordResetEmail(email, code) {
        const from = 'onboarding@resend.dev';
        try {
            await this.transporter.sendMail({
                from: `"Qupedia Support" <${from}>`,
                to: email,
                subject: 'Password Reset Code',
                html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2>Password Reset</h2>
            <p>You requested a password reset. Here is your 6-digit code:</p>
            <h1 style="color: #E24A4A; letter-spacing: 5px;">${code}</h1>
            <p>This code will expire in 15 minutes.</p>
          </div>
        `,
            });
            this.logger.log(`✅ Reset email sent via Resend to ${email}`);
        }
        catch (error) {
            this.logger.error(`❌ Resend Reset Failed: ${error.message}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map