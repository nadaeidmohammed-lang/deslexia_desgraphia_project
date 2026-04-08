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
const dto_1 = require("../dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const decorators_1 = require("../../auth/decorators");
const swagger_1 = require("@nestjs/swagger");
const child_service_1 = require("../services/child.service");
let ChildrenController = class ChildrenController {
    constructor(service) {
        this.service = service;
    }
    create(user, dto) {
        return this.service.create(user.userId, dto);
    }
    findAll(user) {
        return this.service.findAllByParent(user.userId);
    }
    update(user, id, dto) {
        return this.service.update(id, user.userId, dto);
    }
    delete(user, id) {
        return this.service.delete(id, user.userId);
    }
};
exports.ChildrenController = ChildrenController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create child' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_child_dto_1.CreateChildDto]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all children' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update child' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, dto_1.UpdateChildDto]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete child' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "delete", null);
exports.ChildrenController = ChildrenController = __decorate([
    (0, swagger_1.ApiTags)('Children'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/children'),
    __metadata("design:paramtypes", [child_service_1.ChildrenService])
], ChildrenController);
//# sourceMappingURL=child.controller.js.map