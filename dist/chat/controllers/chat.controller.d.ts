import { ChatService } from '../services/chat.service';
import { CreateConversationDto, CreateMessageDto, UpdateConversationDto } from '../dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createConversation(createConversationDto: CreateConversationDto, user: any): Promise<import("../entities/conversation.entity").Conversation>;
    getUserConversations(req: any): Promise<import("../entities/conversation.entity").Conversation[]>;
    getConversation(id: number, req: any): Promise<import("../entities/conversation.entity").Conversation>;
    getMessages(conversationId: number, page?: number, limit?: number, user?: any): Promise<import("../../common/interfaces/pagination").PaginationResult<import("../entities/message.entity").Message>>;
    updateConversation(id: number, updateConversationDto: UpdateConversationDto, req: any): Promise<import("../entities/conversation.entity").Conversation>;
    markMessageAsRead(messageId: number, req: any): Promise<{
        success: boolean;
    }>;
    getUnreadMessageCount(req: any): Promise<{
        unreadCount: number;
    }>;
    deleteConversation(id: number, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteMessage(id: number, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendMessage(conversationId: number, createMessageDto: CreateMessageDto, user: any): Promise<import("../entities/message.entity").Message>;
}
