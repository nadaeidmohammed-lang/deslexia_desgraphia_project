import { Exercise } from '../entities/exercises.entity';
import { ExerciseProvider } from '../providers/exercises.provider';
import { UpdateExerciseDto } from '../dto';
export declare class ExercisesService {
    private readonly exerciseProvider;
    constructor(exerciseProvider: ExerciseProvider);
    findAll(type?: string): Promise<Exercise[]>;
    findOne(id: number): Promise<Exercise>;
    findByLevel(level: string): Promise<Exercise[]>;
    update(id: number, dto: UpdateExerciseDto): Promise<Exercise>;
    remove(id: number): Promise<void>;
}
