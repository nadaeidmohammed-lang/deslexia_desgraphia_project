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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_provider_1 = require("../providers/user.provider");
const bcrypt = require("bcryptjs");
const otp_generator_1 = require("../../utils/otp.generator");
const sendEmail_1 = require("../../utils/sendEmail");
let UsersService = class UsersService {
    constructor(userProvider) {
        this.userProvider = userProvider;
    }
    async create(createUserDto) {
        const user = await this.userProvider.create(createUserDto);
        const otp = (0, otp_generator_1.generateOtp)();
        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await (0, sendEmail_1.sendEmailMock)(user.email, otp);
        return user;
    }
    async findAll(queryDto = {}) { }
    async findOne(id) {
        return this.userProvider.findOne(id);
    }
    async findByEmail(email) {
        return this.userProvider.findByEmail(email);
    }
    async update(id, updateUserDto) {
        const updateData = { ...updateUserDto };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const [affectedCount, updatedUsers] = await this.userProvider.update(id, updateData);
        return updatedUsers[0] || this.findOne(id);
    }
    async remove(id) {
        await this.userProvider.remove(id);
    }
    async verifyEmail(id) {
        await this.userProvider.verifyEmail(id);
    }
    async updateLastLogin(id) {
        await this.userProvider.updateLastLogin(id);
    }
    async count() {
        return this.userProvider.count();
    }
    async countByRole(role) {
        return this.userProvider.countByRole(role);
    }
    async findActiveUsers() {
        return this.userProvider.findActiveUsers();
    }
    async verifyOtp(email, otp) {
        const user = await this.userProvider.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.resetPasswordOtp !== otp) {
            throw new Error('Invalid OTP');
        }
        if (user.resetPasswordExpires < new Date()) {
            throw new Error('OTP expired');
        }
        user.resetPasswordOtp = null;
        user.resetPasswordExpires = null;
        await user.save();
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_provider_1.UserProvider])
], UsersService);
//# sourceMappingURL=users.service.js.map