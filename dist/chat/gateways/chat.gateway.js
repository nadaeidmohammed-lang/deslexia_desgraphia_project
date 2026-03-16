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
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../services/chat.service");
const common_1 = require("@nestjs/common");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
        this.connectedUsers = new Map();
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        const token = client.handshake.auth?.token || client.handshake.headers?.authorization;
        if (token) {
            try {
                const userId = client.handshake.auth?.userId;
                if (userId) {
                    this.connectedUsers.set(client.id, {
                        userId: parseInt(userId),
                        socketId: client.id,
                    });
                    client.join(`user_${userId}`);
                }
            }
            catch (error) {
                this.logger.error('Error processing connection:', error);
            }
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.connectedUsers.delete(client.id);
    }
    async handleJoinConversation(data, client) {
        try {
            const userInfo = this.connectedUsers.get(client.id);
            if (!userInfo) {
                client.emit('error', { message: 'User not authenticated' });
                return;
            }
            await this.chatService.getConversation(data.conversationId, userInfo.userId);
            client.join(`conversation_${data.conversationId}`);
            this.logger.log(`Client ${client.id} joined conversation ${data.conversationId}`);
            client.emit('joinedConversation', {
                conversationId: data.conversationId,
            });
        }
        catch (error) {
            this.logger.error('Error joining conversation:', error);
            client.emit('error', { message: 'Failed to join conversation' });
        }
    }
    handleLeaveConversation(data, client) {
        client.leave(`conversation_${data.conversationId}`);
        this.logger.log(`Client ${client.id} left conversation ${data.conversationId}`);
        client.emit('leftConversation', { conversationId: data.conversationId });
    }
    async handleSendMessage(data, client) {
        try {
            const userInfo = this.connectedUsers.get(client.id);
            if (!userInfo) {
                client.emit('error', { message: 'User not authenticated' });
                return;
            }
            const message = await this.chatService.sendMessage(data.message, data.conversationId, userInfo.userId);
            this.server.to(`conversation_${data.conversationId}`).emit('newMessage', {
                conversationId: data.conversationId,
                message,
            });
            client.emit('messageSent', { message });
            return { success: true, message };
        }
        catch (error) {
            this.logger.error('Error sending message:', error);
            client.emit('error', { message: 'Failed to send message' });
            return { success: false, error: error.message };
        }
    }
    async handleMarkAsRead(data, client) {
        try {
            const userInfo = this.connectedUsers.get(client.id);
            if (!userInfo) {
                client.emit('error', { message: 'User not authenticated' });
                return;
            }
            await this.chatService.markMessageAsRead(data.messageId, userInfo.userId);
            this.server
                .to(`conversation_${data.conversationId}`)
                .emit('messageRead', {
                messageId: data.messageId,
                userId: userInfo.userId,
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error('Error marking message as read:', error);
            client.emit('error', { message: 'Failed to mark message as read' });
            return { success: false, error: error.message };
        }
    }
    handleTyping(data, client) {
        const userInfo = this.connectedUsers.get(client.id);
        if (!userInfo) {
            return;
        }
        client.to(`conversation_${data.conversationId}`).emit('userTyping', {
            userId: userInfo.userId,
            isTyping: data.isTyping,
        });
    }
    sendNotificationToUser(userId, notification) {
        this.server.to(`user_${userId}`).emit('notification', notification);
    }
    getOnlineUsersInConversation(conversationId) {
        const room = this.server.sockets.adapter.rooms.get(`conversation_${conversationId}`);
        if (!room)
            return [];
        const onlineUsers = [];
        room.forEach((socketId) => {
            const userInfo = this.connectedUsers.get(socketId);
            if (userInfo) {
                onlineUsers.push(userInfo.userId);
            }
        });
        return [...new Set(onlineUsers)];
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsRead'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAsRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        },
        namespace: '/chat',
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map