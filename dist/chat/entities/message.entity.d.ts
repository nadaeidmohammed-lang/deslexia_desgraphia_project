import { Model } from 'sequelize-typescript';
import { Conversation } from './conversation.entity';
import { User } from '../../users/entities/user.entity';
export declare class Message extends Model<Message> {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    type: string;
    metadata: any;
    isRead: boolean;
    readAt: Date;
    createdAt: Date;
    updatedAt: Date;
    conversation: Conversation;
    sender: User;
}
