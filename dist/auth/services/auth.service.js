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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_provider_1 = require("../providers/auth.provider");
const sendEmail_1 = require("../../utils/sendEmail");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(authProvider, jwtService, configService) {
        this.authProvider = authProvider;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.authProvider.validateUser(email, password);
        if (!user)
            return null;
        return user;
    }
    async login(user) {
        if (!user.isEmailVerified) {
            throw new common_1.BadRequestException('Please verify your email first');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    async register(registerDto) {
        const emailExists = await this.authProvider.checkEmailExists(registerDto.email);
        if (emailExists) {
            throw new common_1.ConflictException('Email already exists');
        }
        const user = await this.authProvider.createUser(registerDto);
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 10);
        await this.authProvider.saveResetToken(user.id, otp, expires);
        await (0, sendEmail_1.sendEmailMock)(user.email, otp);
        return {
            message: 'User registered successfully. Please verify your email.',
            devOnlyOtp: otp,
        };
    }
    async changePassword(userId, dto) {
        await this.authProvider.updatePassword(userId, dto.newPassword, dto.oldPassword);
        return { message: 'Password updated successfully' };
    }
    async forgotPassword(dto) {
        const user = await this.authProvider.findUserByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User with this email does not exist');
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expirationMinutes = this.configService.get('OTP_EXPIRATION_MINUTES') || 15;
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + Number(expirationMinutes));
        await this.authProvider.saveResetToken(user.id, otp, expires);
        await (0, sendEmail_1.sendEmailMock)(user.email, otp);
        return {
            message: 'OTP sent to your email successfully',
            devOnlyOtp: otp,
        };
    }
    async resetPassword(dto) {
        const user = await this.authProvider.findUserForReset(dto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.validateOtp(user, dto.otp);
        await this.authProvider.updatePassword(user.id, dto.newPassword);
        return {
            message: 'Password has been reset successfully. You can login now.',
        };
    }
    async verifyOtp(email, otp) {
        const user = await this.authProvider.findUserForReset(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.validateOtp(user, otp);
        user.isEmailVerified = true;
        await user.save();
        return {
            message: 'Email verified successfully',
        };
    }
    async validateOtp(user, otp) {
        if (user.otpAttempts >= 5) {
            throw new common_1.BadRequestException('Too many incorrect OTP attempts');
        }
        if (!user.resetPasswordOtp) {
            throw new common_1.BadRequestException('No OTP found');
        }
        if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
            throw new common_1.BadRequestException('OTP expired');
        }
        if (user.resetPasswordOtp !== otp) {
            user.otpAttempts += 1;
            await user.save();
            throw new common_1.BadRequestException('Invalid OTP');
        }
        user.resetPasswordOtp = null;
        user.resetPasswordExpires = null;
        user.otpAttempts = 0;
        await user.save();
    }
    async requestChangePasswordOtp(userId) {
        const user = await this.authProvider.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.resetPasswordExpires &&
            new Date(user.resetPasswordExpires).getTime() - new Date().getTime() >
                9 * 60 * 1000) {
            throw new common_1.BadRequestException('Please wait before requesting another OTP');
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 10);
        await this.authProvider.saveResetToken(user.id, otp, expires);
        await (0, sendEmail_1.sendEmailMock)(user.email, otp);
        return {
            message: 'OTP sent to your email',
        };
    }
    async changePasswordWithOtp(userId, dto) {
        const user = await this.authProvider.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.validateOtp(user, dto.otp);
        await this.authProvider.updatePassword(user.id, dto.newPassword);
        return {
            message: 'Password changed successfully',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_provider_1.AuthProvider,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map