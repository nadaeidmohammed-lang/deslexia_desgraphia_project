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
exports.CreateChildDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateChildDto {
}
exports.CreateChildDto = CreateChildDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Omar' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateChildDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01/01/2020',
        description: 'Format: dd/MM/yyyy',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'birthDate must be in format dd/MM/yyyy',
    }),
    __metadata("design:type", String)
], CreateChildDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '0 = girl, 1 = boy',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], CreateChildDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'assets/images/child/avatar1.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChildDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'level1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7']),
    __metadata("design:type", String)
], CreateChildDto.prototype, "level", void 0);
//# sourceMappingURL=create-child.dto.js.map