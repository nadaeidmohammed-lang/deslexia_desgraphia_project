import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from '../dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    private readonly logger;
    constructor(chatService: ChatService);
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(data: {
        conversationId: number;
    }, client: Socket): Promise<void>;
    handleLeaveConversation(data: {
        conversationId: number;
    }, client: Socket): void;
    handleSendMessage(data: {
        conversationId: number;
        message: CreateMessageDto;
    }, client: Socket): Promise<{
        success: boolean;
        message: import("../entities/message.entity").Message;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleMarkAsRead(data: {
        messageId: number;
        conversationId: number;
    }, client: Socket): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleTyping(data: {
        conversationId: number;
        isTyping: boolean;
    }, client: Socket): void;
    sendNotificationToUser(userId: number, notification: any): void;
    getOnlineUsersInConversation(conversationId: number): number[];
}
