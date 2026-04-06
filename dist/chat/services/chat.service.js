"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_provider_1 = require("../providers/chat.provider");
const groq_sdk_1 = require("groq-sdk");
const config_1 = require("@nestjs/config");
let ChatService = ChatService_1 = class ChatService {
    constructor(chatProvider, configService) {
        this.chatProvider = chatProvider;
        this.configService = configService;
        this.logger = new common_1.Logger(ChatService_1.name);
        const apiKey = this.configService.get('GROQ_API_KEY');
        if (!apiKey) {
            this.logger.error('GROQ_API_KEY is missing in .env file!');
            throw new Error('GROQ_API_KEY is missing or empty');
        }
        this.groq = new groq_sdk_1.default({ apiKey });
    }
    async createConversation(createConversationDto, userId) {
        return this.chatProvider.createConversation(createConversationDto, userId);
    }
    async findUserConversations(userId) {
        return this.chatProvider.findUserConversations(userId);
    }
    async findAllConversations(queryDto) {
        const { rows, count } = await this.chatProvider.findAllConversations(queryDto);
        const { page, limit } = queryDto;
        return {
            data: rows,
            meta: {
                total: count,
                page: Number(page || 1),
                limit: Number(limit || 10),
                totalPages: Math.ceil(count / (limit || 10)),
            },
        };
    }
    async getConversation(id, userId) {
        const conversation = await this.chatProvider.findOneConversation(id);
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        if (userId && conversation.userId !== userId) {
            throw new common_1.ForbiddenException('Access denied to this conversation');
        }
        return conversation;
    }
    async updateConversation(id, updateConversationDto, userId) {
        await this.getConversation(id, userId);
        await this.chatProvider.updateConversation(id, updateConversationDto);
        return this.getConversation(id);
    }
    async countConversations() {
        return this.chatProvider.countConversations();
    }
    async sendMessage(createMessageDto, conversationId, senderId) {
        const conversation = await this.getConversation(conversationId, senderId);
        if (conversation.status === 'archived') {
            throw new common_1.ForbiddenException('Cannot send message to archived conversation');
        }
        const userMessage = await this.chatProvider.createMessage({
            conversationId,
            senderId,
            content: createMessageDto.content,
            type: 'text',
        });
        const history = await this.chatProvider.findConversationMessages(conversationId, 10);
        const formattedHistory = history.map(msg => ({
            role: msg.senderId === senderId ? 'user' : 'assistant',
            content: msg.content,
        }));
        const aiAnalysis = await this.getAiResponse(createMessageDto.content, formattedHistory);
        const botMessage = await this.chatProvider.createMessage({
            conversationId,
            senderId: 0,
            content: aiAnalysis.reply,
            type: 'text',
            metadata: aiAnalysis.feedback,
        });
        return botMessage;
    }
    async getAiResponse(userContent, history) {
        const systemPrompt = `
    You are an AI assistant that helps parents support their children with learning difficulties such as dyslexia and dysgraphia.
    You must ALWAYS respond with VALID JSON ONLY.

    Response format:
    {
     "reply": "A natural Arabic message to the parent",
     "feedback": {
       "detected_words": [],
       "suspected_letter": "",
       "issue_type": "dyslexia or dysgraphia or none"
        }
    }

    Rules:
    - The "reply" MUST be in Arabic language only.
    - The "reply" must be a normal, friendly Arabic response to the parent.
    - Extract words mentioned by the parent that show difficulty.
    - Detect the most repeated letter causing trouble.
    - Return ONLY JSON. Do not write any conversational text outside the JSON block.
  `;
        const completion = await this.groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...history,
                { role: 'user', content: userContent },
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.2,
            response_format: { type: "json_object" }
        });
        return JSON.parse(completion.choices[0].message.content);
    }
    async getMessages(conversationId, query, userId) {
        if (userId) {
            await this.getConversation(conversationId, userId);
        }
        query.conversationId = conversationId;
        const { rows, count } = await this.chatProvider.findAllMessages(query);
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 50;
        return {
            data: rows,
            meta: {
                total: count,
                page: page,
                limit: limit,
                totalPages: Math.ceil(count / limit),
            },
        };
    }
    async markMessageAsRead(messageId, userId) {
        const message = await this.chatProvider.findMessageById(messageId);
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        if (message.senderId === userId) {
            return;
        }
        await this.chatProvider.updateMessageReadStatus(messageId, true);
    }
    async getUnreadCount(userId) {
        return this.chatProvider.countUnreadMessages(userId);
    }
    async deleteConversation(id, userId) {
        const conversation = await this.chatProvider.findOneConversation(id);
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        if (conversation.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to delete this conversation');
        }
        await this.chatProvider.deleteConversation(id);
    }
    async findAllMessages(queryDto = {}) {
        return this.chatProvider.findAllMessages(queryDto);
    }
    async deleteMessage(id, userId) {
        const message = await this.chatProvider.findMessageById(id);
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        if (message.senderId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own messages');
        }
        await this.chatProvider.deleteMessage(id);
    }
    async getMessageStats() {
        return this.chatProvider.countMessages();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_provider_1.ChatProvider,
        config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map