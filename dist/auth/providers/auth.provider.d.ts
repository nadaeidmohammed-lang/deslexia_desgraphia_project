import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthProvider {
    private readonly userModel;
    constructor(userModel: typeof User);
    createUser(registerDto: RegisterDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserForReset(email: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
    updateLastLogin(userId: number): Promise<void>;
    updatePassword(userId: number, newPassword: string, oldPassword?: string): Promise<void>;
    saveResetToken(userId: number, otp: string, expires: Date): Promise<void>;
    checkEmailExists(email: string): Promise<boolean>;
    deactivateUser(userId: number): Promise<void>;
    activateUser(userId: number): Promise<void>;
    updateProfile(userId: number, profileData: Partial<User>): Promise<void>;
    findUsersByRole(role: string): Promise<User[]>;
    countActiveUsers(): Promise<number>;
    findRecentUsers(limit?: number): Promise<User[]>;
}
