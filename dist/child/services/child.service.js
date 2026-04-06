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
exports.ChildrenService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const child_entity_1 = require("../entities/child.entity");
let ChildrenService = class ChildrenService {
    constructor(childModel) {
        this.childModel = childModel;
    }
    async create(parentId, dto) {
        return this.childModel.create({ ...dto, parentId });
    }
    async findAllByParent(parentId) {
        return this.childModel.findAll({ where: { parentId } });
    }
    async update(id, parentId, dto) {
        const child = await this.childModel.findOne({ where: { id, parentId } });
        if (!child) {
            throw new common_1.NotFoundException('Child profile not found or access denied');
        }
        return child.update(dto);
    }
};
exports.ChildrenService = ChildrenService;
exports.ChildrenService = ChildrenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(child_entity_1.Child)),
    __metadata("design:paramtypes", [Object])
], ChildrenService);
//# sourceMappingURL=child.service.js.map