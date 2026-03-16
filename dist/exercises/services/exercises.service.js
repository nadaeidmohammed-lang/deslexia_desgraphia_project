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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const exercises_provider_1 = require("../providers/exercises.provider");
let ExercisesService = class ExercisesService {
    constructor(exerciseProvider) {
        this.exerciseProvider = exerciseProvider;
    }
    async findAll(type) {
        return this.exerciseProvider.findAll(type);
    }
    async findOne(id) {
        const exercise = await this.exerciseProvider.findOne(id);
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }
    async findByLevel(level) {
        return this.exerciseProvider.findAll(undefined, level);
    }
    async update(id, dto) {
        const exercise = await this.exerciseProvider.findOne(id);
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise.update(dto);
    }
    async remove(id) {
        const exercise = await this.exerciseProvider.findOne(id);
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        await exercise.destroy();
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exercises_provider_1.ExerciseProvider])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map