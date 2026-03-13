import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from '../providers/auth.provider';
import { ChangePasswordDto, RegisterDto } from '../dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from '../dto/forget-password.dto';
import { sendEmailMock } from '../../utils/sendEmail';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordWithOtpDto } from '../dto/change-password-with-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authProvider.validateUser(email, password);

    if (!user) return null;

    return user;
  }

  async login(user: any) {
    if (!user.isEmailVerified) {
      throw new BadRequestException('Please verify your email first');
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

  async register(registerDto: RegisterDto) {
    const emailExists = await this.authProvider.checkEmailExists(
      registerDto.email,
    );

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.authProvider.createUser(registerDto);

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10);

    // Save OTP in database
    await this.authProvider.saveResetToken(user.id, otp, expires);

    // Send Email
    await sendEmailMock(user.email, otp);

    return {
      message: 'User registered successfully. Please verify your email.',
      devOnlyOtp: otp,
    };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    await this.authProvider.updatePassword(
      userId,
      dto.newPassword,
      dto.oldPassword,
    );
    return { message: 'Password updated successfully' };
  }

  // 1. Forgot Password Flow
  async forgotPassword(dto: ForgotPasswordDto) {
    // 1. Check User
    const user = await this.authProvider.findUserByEmail(dto.email);
    if (!user)
      throw new NotFoundException('User with this email does not exist');

    // 2. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //  3. Get Expiration from ENV (Default to 15 if not set)
    const expirationMinutes =
      this.configService.get<number>('OTP_EXPIRATION_MINUTES') || 15;

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + Number(expirationMinutes));

    // 4. Save to DB (using Provider)
    await this.authProvider.saveResetToken(user.id, otp, expires);

    // 5. Send Email (using Utils)
    await sendEmailMock(user.email, otp);

    return {
      message: 'OTP sent to your email successfully',
      devOnlyOtp: otp,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.authProvider.findUserForReset(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.validateOtp(user, dto.otp);
    await this.authProvider.updatePassword(user.id, dto.newPassword);
    return {
      message: 'Password has been reset successfully. You can login now.',
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.authProvider.findUserForReset(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.validateOtp(user, otp);
    user.isEmailVerified = true;
    await user.save();
    return {
      message: 'Email verified successfully',
    };
  }

  async validateOtp(user: any, otp: string) {
    if (user.otpAttempts >= 5) {
      throw new BadRequestException('Too many incorrect OTP attempts');
    }
    if (!user.resetPasswordOtp) {
      throw new BadRequestException('No OTP found');
    }
    if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
      throw new BadRequestException('OTP expired');
    }
    if (user.resetPasswordOtp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      throw new BadRequestException('Invalid OTP');
    }
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    user.otpAttempts = 0;
    await user.save();
  }

  async requestChangePasswordOtp(userId: number) {
    const user = await this.authProvider.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (
      user.resetPasswordExpires &&
      new Date(user.resetPasswordExpires).getTime() - new Date().getTime() >
        9 * 60 * 1000
    ) {
      throw new BadRequestException(
        'Please wait before requesting another OTP',
      );
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10);
    await this.authProvider.saveResetToken(user.id, otp, expires);
    await sendEmailMock(user.email, otp);
    return {
      message: 'OTP sent to your email',
    };
  }
  async changePasswordWithOtp(userId: number, dto: ChangePasswordWithOtpDto) {
    const user = await this.authProvider.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.validateOtp(user, dto.otp);
    await this.authProvider.updatePassword(user.id, dto.newPassword);
    return {
      message: 'Password changed successfully',
    };
  }
}
