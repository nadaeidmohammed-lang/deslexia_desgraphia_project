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

@Injectable()
export class AuthService {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authProvider.validateUser(email, password);
    if (user) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: any) {
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
    await this.authProvider.updateLastLogin(user.id);
    return this.login(user);
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

  // 2. Reset Password Flow
  async resetPassword(dto: ResetPasswordDto) {
    // 1. Get User with OTP fields
    const user = await this.authProvider.findUserForReset(dto.email);
    if (!user) throw new NotFoundException('User not found');

    // 2. Validate OTP
    if (user.resetPasswordOtp !== dto.otp) {
      throw new BadRequestException('Invalid OTP provided');
    }

    if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
      throw new BadRequestException(
        'OTP has expired, please request a new one',
      );
    }

    await this.authProvider.updatePassword(user.id, dto.newPassword);

    return {
      message: 'Password has been reset successfully. You can login now.',
    };
  }
}
