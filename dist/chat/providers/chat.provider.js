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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProvider = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const conversation_entity_1 = require("../entities/conversation.entity");
const message_entity_1 = require("../entities/message.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const sequelize_2 = require("sequelize");
let ChatProvider = class ChatProvider {
    constructor(conversationModel, messageModel) {
        this.conversationModel = conversationModel;
        this.messageModel = messageModel;
    }
    async createConversation(createConversationDto, userId) {
        return this.conversationModel.create({
            ...createConversationDto,
            userId,
            lastMessageAt: new Date(),
        });
    }
    async findAllConversations(queryDto) {
        const { page = 1, limit = 10, search, status, sortBy = 'lastMessageAt', sortOrder = 'DESC', } = queryDto;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (search) {
            whereClause.title = { [sequelize_2.Op.like]: `%${search}%` };
        }
        if (status) {
            whereClause.status = status;
        }
        return this.conversationModel.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: user_entity_1.User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
                {
                    model: message_entity_1.Message,
                    as: 'messages',
                    separate: true,
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
            ],
            limit,
            offset,
            order: [[sortBy, sortOrder]],
        });
    }
    async findOneConversation(id) {
        return this.conversationModel.findByPk(id, {
            include: [
                {
                    model: user_entity_1.User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
            ],
        });
    }
    async findUserConversations(userId) {
        return this.conversationModel.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: message_entity_1.Message,
                    as: 'messages',
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
            ],
            order: [['lastMessageAt', 'DESC']],
        });
    }
    async updateConversation(id, updateData) {
        return this.conversationModel.update(updateData, {
            where: { id },
        });
    }
    async deleteConversation(id) {
        return this.conversationModel.destroy({ where: { id } });
    }
    async createMessage(data) {
        const message = await this.messageModel.create(data);
        await this.updateLastMessageTime(data.conversationId);
        return message;
    }
    async findAllMessages(queryDto) {
        const { page = 1, limit = 50, conversationId, senderId, type, search, sortBy = 'createdAt', sortOrder = 'DESC', } = queryDto;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (conversationId)
            whereClause.conversationId = conversationId;
        if (senderId)
            whereClause.senderId = senderId;
        if (type)
            whereClause.type = type;
        if (search)
            whereClause.content = { [sequelize_2.Op.like]: `%${search}%` };
        const orderColumn = sortBy === 'createdAt' ? 'id' : sortBy;
        return this.messageModel.findAndCountAll({
            where: whereClause,
            distinct: true,
            include: [
                {
                    model: user_entity_1.User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
                {
                    model: conversation_entity_1.Conversation,
                    as: 'conversation',
                    attributes: ['id', 'title', 'status'],
                },
            ],
            limit,
            offset,
            order: [[orderColumn, sortOrder]],
        });
    }
    async findOneMessage(id) {
        return this.messageModel.findByPk(id, {
            include: [
                {
                    model: user_entity_1.User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
                {
                    model: conversation_entity_1.Conversation,
                    as: 'conversation',
                    attributes: ['id', 'title', 'status'],
                },
            ],
        });
    }
    async findConversationMessages(conversationId, limit = 50) {
        return this.messageModel.findAll({
            where: { conversationId },
            include: [
                {
                    model: user_entity_1.User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
            ],
            order: [['createdAt', 'ASC']],
            limit,
        });
    }
    async updateMessage(id, updateData) {
        const updateFields = { ...updateData };
        return this.messageModel.update(updateFields, {
            where: { id },
            returning: true,
        });
    }
    async markMessageAsRead(id) {
        await this.messageModel.update({ isRead: true }, { where: { id } });
    }
    async markConversationMessagesAsRead(conversationId, userId) {
        await this.messageModel.update({ isRead: true }, {
            where: {
                conversationId,
                senderId: { [sequelize_2.Op.ne]: userId },
                isRead: false,
            },
        });
    }
    async getUnreadMessageCount(userId) {
        return this.messageModel.count({
            include: [
                {
                    model: conversation_entity_1.Conversation,
                    as: 'conversation',
                    where: { userId: userId },
                },
            ],
            where: {
                senderId: { [sequelize_2.Op.ne]: userId },
                isRead: false,
            },
        });
    }
    async countConversations() {
        return this.conversationModel.count();
    }
    async countMessages() {
        return this.messageModel.count();
    }
    async findMessageById(id) {
        return this.messageModel.findByPk(id, {
            include: [
                { model: conversation_entity_1.Conversation, as: 'conversation' },
                {
                    model: user_entity_1.User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName', 'avatar'],
                },
                {
                    model: conversation_entity_1.Conversation,
                    as: 'conversation',
                    attributes: ['id', 'title', 'status'],
                },
            ],
        });
    }
    async updateMessageReadStatus(messageId, isRead) {
        await this.messageModel.update({ isRead }, { where: { id: messageId } });
    }
    async countUnreadMessages(userId) {
        return this.messageModel.count({
            include: [
                {
                    model: conversation_entity_1.Conversation,
                    as: 'conversation',
                    where: { userId: userId },
                },
            ],
            where: {
                senderId: { [sequelize_2.Op.ne]: userId },
                isRead: false,
            },
        });
    }
    async deleteMessage(id) {
        return this.messageModel.destroy({ where: { id } });
    }
    async updateLastMessageTime(conversationId) {
        await this.conversationModel.update({ lastMessageAt: new Date() }, { where: { id: conversationId } });
    }
};
exports.ChatProvider = ChatProvider;
exports.ChatProvider = ChatProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(conversation_entity_1.Conversation)),
    __param(1, (0, sequelize_1.InjectModel)(message_entity_1.Message)),
    __metadata("design:paramtypes", [Object, Object])
], ChatProvider);
//# sourceMappingURL=chat.provider.js.map