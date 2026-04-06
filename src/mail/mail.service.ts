import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<number>('MAIL_PORT') === 465, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    const from = this.configService.get<string>('MAIL_FROM');
    
    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Email Verification Code',
      html: `
        <h2>Email Verification</h2>
        <p>Please use the following 6-digit code to verify your account:</p>
        <h1>${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    });
  }

  async sendPasswordResetEmail(email: string, code: string): Promise<void> {
    const from = this.configService.get<string>('MAIL_FROM');
    
    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Password Reset Code',
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Here is your 6-digit code:</p>
        <h1>${code}</h1>
        <p>This code will expire in 15 minutes.</p>
      `,
    });
  }
}
