import { Model } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';
export declare class Conversation extends Model<Conversation> {
    id: number;
    userId: number;
    title: string;
    status: string;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    messages: Message[];
    lastMessage: Message;
}
