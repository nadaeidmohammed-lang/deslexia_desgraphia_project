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
exports.ChildrenService = void 0;
const common_1 = require("@nestjs/common");
const child_provider_1 = require("../providers/child.provider");
let ChildrenService = class ChildrenService {
    constructor(childProvider) {
        this.childProvider = childProvider;
    }
    async create(userId, dto) {
        const child = await this.childProvider.create(userId, dto);
        return {
            message: 'Child created successfully',
            data: child,
        };
    }
    async findAllByParent(parentId) {
        return this.childProvider.findAllByParent(parentId);
    }
    async update(id, parentId, dto) {
        const updated = await this.childProvider.update(id, parentId, dto);
        if (!updated) {
            throw new common_1.NotFoundException('Child not found or you are not allowed to access it');
        }
        return {
            message: 'Child updated successfully',
            data: updated,
        };
    }
    async delete(id, parentId) {
        const deleted = await this.childProvider.remove(id, parentId);
        if (!deleted) {
            throw new common_1.NotFoundException('Child not found or you are not allowed to delete it');
        }
        return {
            message: 'Child deleted successfully',
        };
    }
};
exports.ChildrenService = ChildrenService;
exports.ChildrenService = ChildrenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [child_provider_1.ChildProvider])
], ChildrenService);
//# sourceMappingURL=child.service.js.map