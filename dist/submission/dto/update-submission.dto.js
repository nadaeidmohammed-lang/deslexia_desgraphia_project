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
exports.UpdateSubmissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
const create_submission_dto_1 = require("./create-submission.dto");
class UpdateSubmissionDto extends (0, swagger_1.PartialType)(create_submission_dto_1.CreateSubmissionDto) {
}
exports.UpdateSubmissionDto = UpdateSubmissionDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Manual score override or AI update' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSubmissionDto.prototype, "score", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Updated feedback from AI or Specialist' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSubmissionDto.prototype, "aiFeedback", void 0);
//# sourceMappingURL=update-submission.dto.js.map