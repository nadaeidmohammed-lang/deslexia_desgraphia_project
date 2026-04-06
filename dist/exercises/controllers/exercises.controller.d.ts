import { ExercisesService } from '../services/exercises.service';
import { UpdateExerciseDto } from '../dto';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    getAll(type: string): Promise<import("../entities/exercises.entity").Exercise[]>;
    getOne(id: number): Promise<import("../entities/exercises.entity").Exercise>;
    update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<import("../entities/exercises.entity").Exercise>;
    remove(id: number): Promise<void>;
}
