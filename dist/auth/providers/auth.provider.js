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
exports.AuthProvider = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../../users/entities/user.entity");
const bcrypt = require("bcrypt");
let AuthProvider = class AuthProvider {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        return this.userModel.create({
            ...registerDto,
            password: hashedPassword,
            isActive: true,
        });
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({
            where: { email },
            attributes: [
                'id',
                'email',
                'password',
                'firstName',
                'lastName',
                'role',
                'isActive',
                'isEmailVerified',
            ],
        });
    }
    async findUserForReset(email) {
        return this.userModel.findOne({
            where: { email },
            attributes: ['id', 'email', 'resetPasswordOtp', 'resetPasswordExpires', 'otpAttempts'],
        });
    }
    async findUserForVerification(email) {
        return this.userModel.findOne({
            where: { email },
            attributes: ['id', 'email', 'verificationCode', 'verificationExpires', 'otpAttempts', 'isEmailVerified'],
        });
    }
    async findUserById(id) {
        return this.userModel.findByPk(id, {
            attributes: [
                'id',
                'email',
                'firstName',
                'lastName',
                'phone',
                'avatar',
                'role',
                'isActive',
                'resetPasswordOtp',
                'resetPasswordExpires',
                'otpAttempts',
            ],
        });
    }
    async validateUser(email, password) {
        const user = await this.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async updateLastLogin(userId) {
        console.log(userId);
    }
    async updatePassword(userId, newPassword, oldPassword) {
        const user = await this.userModel.findByPk(userId);
        if (!user) {
            throw new common_1.NotFoundException(`User Not Found`);
        }
        if (oldPassword) {
            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new common_1.UnauthorizedException('Old password is incorrect');
            }
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOtp = null;
        user.resetPasswordExpires = null;
        await user.save();
    }
    async saveResetToken(userId, otp, expires) {
        await this.userModel.update({ resetPasswordOtp: otp, resetPasswordExpires: expires, otpAttempts: 0 }, { where: { id: userId } });
    }
    async saveVerificationToken(userId, code, expires) {
        await this.userModel.update({ verificationCode: code, verificationExpires: expires, otpAttempts: 0 }, { where: { id: userId } });
    }
    async checkEmailExists(email) {
        const user = await this.userModel.findOne({
            where: { email },
            attributes: ['id'],
        });
        return !!user;
    }
    async deactivateUser(userId) {
        await this.userModel.update({ isActive: false }, { where: { id: userId } });
    }
    async activateUser(userId) {
        await this.userModel.update({ isActive: true }, { where: { id: userId } });
    }
    async updateProfile(userId, profileData) {
        const allowedFields = ['firstName', 'lastName', 'phone', 'avatar'];
        const updateData = Object.keys(profileData)
            .filter((key) => allowedFields.includes(key))
            .reduce((obj, key) => {
            obj[key] = profileData[key];
            return obj;
        }, {});
        await this.userModel.update(updateData, { where: { id: userId } });
    }
    async findUsersByRole(role) {
        return this.userModel.findAll({ where: { role, isActive: true } });
    }
    async countActiveUsers() {
        return this.userModel.count({ where: { isActive: true } });
    }
    async findRecentUsers(limit = 10) {
        return this.userModel.findAll({
            where: { isActive: true },
            limit,
            order: [['createdAt', 'DESC']],
        });
    }
};
exports.AuthProvider = AuthProvider;
exports.AuthProvider = AuthProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], AuthProvider);
//# sourceMappingURL=auth.provider.js.map