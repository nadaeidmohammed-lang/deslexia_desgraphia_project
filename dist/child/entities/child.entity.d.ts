import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
export declare class Child extends Model<Child> {
    id: number;
    name: string;
    age: number;
    conditionType: string;
    parentId: number;
    parent: User;
}
