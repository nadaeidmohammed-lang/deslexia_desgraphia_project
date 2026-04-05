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
exports.QueryConversationDto = exports.SortOrder = exports.ConversationSortBy = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
var ConversationSortBy;
(function (ConversationSortBy) {
    ConversationSortBy["CREATED_AT"] = "createdAt";
    ConversationSortBy["UPDATED_AT"] = "updatedAt";
    ConversationSortBy["TITLE"] = "title";
})(ConversationSortBy || (exports.ConversationSortBy = ConversationSortBy = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class QueryConversationDto extends pagination_dto_1.PaginationDto {
    constructor() {
        super(...arguments);
        this.sortBy = ConversationSortBy.CREATED_AT;
        this.sortOrder = SortOrder.DESC;
    }
}
exports.QueryConversationDto = QueryConversationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by conversation status',
        enum: ['active', 'closed', 'archived'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'closed', 'archived']),
    __metadata("design:type", String)
], QueryConversationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        enum: ConversationSortBy,
        default: ConversationSortBy.CREATED_AT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ConversationSortBy),
    __metadata("design:type", String)
], QueryConversationDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: SortOrder,
        default: SortOrder.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder),
    __metadata("design:type", String)
], QueryConversationDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-conversation.dto.js.map