import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { QueryConversationDto } from '../dto/query-conversation.dto';
import { QueryMessageDto } from '../dto/query-message.dto';
export declare class ChatProvider {
    private readonly conversationModel;
    private readonly messageModel;
    constructor(conversationModel: typeof Conversation, messageModel: typeof Message);
    createConversation(createConversationDto: CreateConversationDto, userId: number): Promise<Conversation>;
    findAllConversations(queryDto: QueryConversationDto): Promise<{
        rows: Conversation[];
        count: number;
    }>;
    findOneConversation(id: number): Promise<Conversation>;
    findUserConversations(userId: number): Promise<Conversation[]>;
    updateConversation(id: number, updateData: Partial<Conversation>): Promise<[number]>;
    deleteConversation(id: number): Promise<number>;
    createMessage(data: any): Promise<Message>;
    findAllMessages(queryDto: QueryMessageDto): Promise<{
        rows: Message[];
        count: number;
    }>;
    findOneMessage(id: number): Promise<Message>;
    findConversationMessages(conversationId: number, limit?: number): Promise<Message[]>;
    updateMessage(id: number, updateData: Partial<Message>): Promise<[number, Message[]]>;
    markMessageAsRead(id: number): Promise<void>;
    markConversationMessagesAsRead(conversationId: number, userId: number): Promise<void>;
    getUnreadMessageCount(userId: number): Promise<number>;
    countConversations(): Promise<number>;
    countMessages(): Promise<number>;
    findMessageById(id: number): Promise<Message>;
    updateMessageReadStatus(messageId: number, isRead: boolean): Promise<void>;
    countUnreadMessages(userId: number): Promise<number>;
    deleteMessage(id: number): Promise<number>;
    updateLastMessageTime(conversationId: number): Promise<void>;
}
