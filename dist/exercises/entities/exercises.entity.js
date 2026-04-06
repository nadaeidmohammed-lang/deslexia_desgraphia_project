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
exports.Exercise = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Exercise = class Exercise extends sequelize_typescript_1.Model {
};
exports.Exercise = Exercise;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Exercise.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('speech', 'handwriting', 'reading'),
        allowNull: false
    }),
    __metadata("design:type", String)
], Exercise.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Exercise.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Exercise.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Exercise.prototype, "audioUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('beginner', 'intermediate', 'advanced'), defaultValue: 'beginner' }),
    __metadata("design:type", String)
], Exercise.prototype, "level", void 0);
exports.Exercise = Exercise = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'exercises' })
], Exercise);
//# sourceMappingURL=exercises.entity.js.map