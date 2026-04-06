import { AuthService } from '../services/auth.service';
import { RegisterDto, ChangePasswordDto } from '../dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/forget-password.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { ChangePasswordWithOtpDto } from '../dto/change-password-with-otp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
    changePassword(user: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        devOnlyOtp: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(body: VerifyOtpDto): Promise<{
        message: string;
    }>;
    requestChangePasswordOtp(user: any): Promise<{
        message: string;
    }>;
    changePasswordWithOtp(user: any, dto: ChangePasswordWithOtpDto): Promise<{
        message: string;
    }>;
}
