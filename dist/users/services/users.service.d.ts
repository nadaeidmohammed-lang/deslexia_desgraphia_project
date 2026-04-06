import { UserProvider } from '../providers/user.provider';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private readonly userProvider;
    constructor(userProvider: UserProvider);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(queryDto?: any): Promise<void>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    verifyEmail(id: number): Promise<void>;
    updateLastLogin(id: number): Promise<void>;
    count(): Promise<number>;
    countByRole(role: string): Promise<number>;
    findActiveUsers(): Promise<User[]>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
}
