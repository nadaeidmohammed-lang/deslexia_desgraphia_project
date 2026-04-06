import { ChatProvider } from '../providers/chat.provider';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { CreateConversationDto, CreateMessageDto, UpdateConversationDto, QueryConversationDto } from '../dto';
import { PaginationResult } from '../../common/interfaces/pagination';
import { QueryMessageDto } from '../dto/query-message.dto';
import { ConfigService } from '@nestjs/config';
export declare class ChatService {
    private readonly chatProvider;
    private readonly configService;
    private groq;
    private readonly logger;
    constructor(chatProvider: ChatProvider, configService: ConfigService);
    createConversation(createConversationDto: CreateConversationDto, userId: number): Promise<Conversation>;
    findUserConversations(userId: number): Promise<Conversation[]>;
    findAllConversations(queryDto: QueryConversationDto): Promise<PaginationResult<Conversation>>;
    getConversation(id: number, userId?: number): Promise<Conversation>;
    updateConversation(id: number, updateConversationDto: UpdateConversationDto, userId: number): Promise<Conversation>;
    countConversations(): Promise<number>;
    sendMessage(createMessageDto: CreateMessageDto, conversationId: number, senderId: number): Promise<Message>;
    private getAiResponse;
    getMessages(conversationId: number, query: QueryMessageDto, userId?: number): Promise<PaginationResult<Message>>;
    markMessageAsRead(messageId: number, userId: number): Promise<void>;
    getUnreadCount(userId: number): Promise<number>;
    deleteConversation(id: number, userId: number): Promise<void>;
    findAllMessages(queryDto?: any): Promise<any>;
    deleteMessage(id: number, userId: number): Promise<void>;
    getMessageStats(): Promise<number>;
}
