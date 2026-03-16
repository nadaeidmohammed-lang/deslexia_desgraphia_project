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
exports.Submission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const exercises_entity_1 = require("../../exercises/entities/exercises.entity");
const child_entity_1 = require("../../child/entities/child.entity");
let Submission = class Submission extends sequelize_typescript_1.Model {
};
exports.Submission = Submission;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Submission.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => child_entity_1.Child),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Submission.prototype, "childId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => exercises_entity_1.Exercise),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Submission.prototype, "exerciseId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Submission.prototype, "fileUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, defaultValue: 0 }),
    __metadata("design:type", Number)
], Submission.prototype, "score", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], Submission.prototype, "aiFeedback", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, allowNull: true }),
    __metadata("design:type", Object)
], Submission.prototype, "metadata", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => child_entity_1.Child),
    __metadata("design:type", child_entity_1.Child)
], Submission.prototype, "child", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => exercises_entity_1.Exercise),
    __metadata("design:type", exercises_entity_1.Exercise)
], Submission.prototype, "exercise", void 0);
exports.Submission = Submission = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'submissions', timestamps: true })
], Submission);
//# sourceMappingURL=submission.entity.js.map