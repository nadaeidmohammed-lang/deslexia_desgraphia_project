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
exports.ChildrenController = void 0;
const common_1 = require("@nestjs/common");
const create_child_dto_1 = require("../dto/create-child.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const decorators_1 = require("../../auth/decorators");
const swagger_1 = require("@nestjs/swagger");
const child_service_1 = require("../services/child.service");
const dto_1 = require("../dto");
let ChildrenController = class ChildrenController {
    constructor(childrenService) {
        this.childrenService = childrenService;
    }
    async create(user, createChildDto) {
        return this.childrenService.create(user.userId, createChildDto);
    }
    async findAll(user) {
        return this.childrenService.findAllByParent(user.userId);
    }
    async update(user, id, updateChildDto) {
        return this.childrenService.update(id, user.userId, updateChildDto);
    }
};
exports.ChildrenController = ChildrenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_child_dto_1.CreateChildDto]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update child profile' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, dto_1.UpdateChildDto]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "update", null);
exports.ChildrenController = ChildrenController = __decorate([
    (0, swagger_1.ApiTags)('Children'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('children'),
    __metadata("design:paramtypes", [child_service_1.ChildrenService])
], ChildrenController);
//# sourceMappingURL=child.controller.js.map