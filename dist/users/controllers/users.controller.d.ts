import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<void>;
    getProfile(user: any): Promise<import("../entities/user.entity").User>;
    updateProfile(user: any, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    findOne(id: number): Promise<import("../entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: number): Promise<void>;
    verifyOtp(body: VerifyOtpDto): Promise<{
        message: string;
    }>;
}
