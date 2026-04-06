"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const child_provider_1 = require("./providers/child.provider");
const child_entity_1 = require("./entities/child.entity");
const child_controller_1 = require("./controllers/child.controller");
const child_service_1 = require("./services/child.service");
let ChildrenModule = class ChildrenModule {
};
exports.ChildrenModule = ChildrenModule;
exports.ChildrenModule = ChildrenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([child_entity_1.Child]),
        ],
        controllers: [child_controller_1.ChildrenController],
        providers: [child_service_1.ChildrenService, child_provider_1.ChildProvider],
        exports: [child_service_1.ChildrenService],
    })
], ChildrenModule);
//# sourceMappingURL=child.module.js.map