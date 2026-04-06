import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserProvider {
    private readonly userModel;
    constructor(userModel: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(queryDto?: any): Promise<{
        data: User[];
        total: number;
        page: any;
        limit: any;
        totalPages: number;
    }>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]>;
    remove(id: number): Promise<number>;
    updateLastLogin(id: number): Promise<void>;
    verifyEmail(id: number): Promise<User>;
    count(): Promise<number>;
    countByRole(role: string): Promise<number>;
    findActiveUsers(): Promise<User[]>;
}
