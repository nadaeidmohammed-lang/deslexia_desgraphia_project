import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
export declare class Child extends Model<Child> {
    id: number;
    name: string;
    birthDate: string;
    gender: number;
    avatar: string;
    level: string;
    parentId: number;
    parent: User;
}
