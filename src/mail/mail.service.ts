import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      options: {
        family: 4
      }
    } as any);
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    const from = this.configService.get<string>('MAIL_FROM');

    try {
      await this.transporter.sendMail({
        from,
        to: email,
        subject: 'Email Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2>Email Verification</h2>
            <p>Please use the following 6-digit code to verify your account:</p>
            <h1 style="color: #4A90E2; letter-spacing: 5px;">${code}</h1>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}: ${error.message}`);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, code: string): Promise<void> {
    const from = this.configService.get<string>('MAIL_FROM');

    try {
      await this.transporter.sendMail({
        from: `"Qupedia Support" <${this.configService.get<string>('MAIL_USER')}>`,
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
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${email}: ${error.message}`);
      throw error;
    }
  }
}