import { Model } from 'sequelize-typescript';
import { Conversation } from '../../chat/entities/conversation.entity';
import { Message } from 'src/chat/entities/message.entity';
export declare class User extends Model<User> {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
    isActive: boolean;
    resetPasswordOtp: string;
    resetPasswordExpires: Date;
    createdAt: Date;
    updatedAt: Date;
    conversations: Conversation[];
    messages: Message[];
    isEmailVerified: boolean;
    otpAttempts: number;
    verificationCode: string;
    verificationExpires: Date;
    deletedAt: Date;
}
