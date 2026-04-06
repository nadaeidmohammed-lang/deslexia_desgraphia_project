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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const submission_provider_1 = require("../providers/submission.provider");
let SubmissionsService = class SubmissionsService {
    constructor(submissionProvider) {
        this.submissionProvider = submissionProvider;
    }
    async submitExercise(dto) {
        return this.submissionProvider.create(dto);
    }
    async getChildProgress(childId) {
        return this.submissionProvider.findByChild(childId);
    }
    async update(id, dto) {
        const submission = await this.submissionProvider.findOne(id);
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        return submission.update(dto);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_provider_1.SubmissionProvider])
], SubmissionsService);
//# sourceMappingURL=submission.service.js.map