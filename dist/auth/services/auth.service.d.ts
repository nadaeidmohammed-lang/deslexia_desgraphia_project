import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from '../providers/auth.provider';
import { ChangePasswordDto, RegisterDto } from '../dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/forget-password.dto';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly authProvider;
    private readonly jwtService;
    private readonly configService;
    private readonly mailService;
    constructor(authProvider: AuthProvider, jwtService: JwtService, configService: ConfigService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        devOnlyOtp: string;
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        devOnlyOtp: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    validateOtp(user: any, otp: string): Promise<void>;
    deleteAccount(userId: number, password: string): Promise<{
        message: string;
    }>;
}
