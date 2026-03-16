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
exports.UserProvider = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entities/user.entity");
const sequelize_2 = require("sequelize");
let UserProvider = class UserProvider {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        return this.userModel.create(createUserDto);
    }
    async findAll(queryDto = {}) {
        const { page = 1, limit = 10, search, role, isActive } = queryDto;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (search) {
            whereClause[sequelize_2.Op.or] = [
                { firstName: { [sequelize_2.Op.like]: `%${search}%` } },
                { lastName: { [sequelize_2.Op.like]: `%${search}%` } },
                { email: { [sequelize_2.Op.like]: `%${search}%` } },
            ];
        }
        if (role) {
            whereClause.role = role;
        }
        if (isActive !== undefined) {
            whereClause.isActive = isActive;
        }
        const { count, rows } = await this.userModel.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        return {
            data: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        };
    }
    async findOne(id) {
        return this.userModel.findByPk(id);
    }
    async findByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
    async update(id, updateUserDto) {
        return this.userModel.update(updateUserDto, {
            where: { id },
            returning: true,
        });
    }
    async remove(id) {
        return this.userModel.destroy({ where: { id } });
    }
    async updateLastLogin(id) {
        await this.userModel.update({ updatedAt: new Date() }, { where: { id } });
    }
    async verifyEmail(id) {
        const user = await this.findOne(id);
        return user;
    }
    async count() {
        return this.userModel.count();
    }
    async countByRole(role) {
        return this.userModel.count({ where: { role } });
    }
    async findActiveUsers() {
        return this.userModel.findAll({ where: { isActive: true } });
    }
};
exports.UserProvider = UserProvider;
exports.UserProvider = UserProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UserProvider);
//# sourceMappingURL=user.provider.js.map