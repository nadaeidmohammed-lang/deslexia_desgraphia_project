import { Exercise } from '../entities/exercises.entity';
export declare class ExerciseProvider {
    private exerciseModel;
    constructor(exerciseModel: typeof Exercise);
    findAll(type?: string, level?: string): Promise<Exercise[]>;
    findOne(id: number): Promise<Exercise>;
    remove(id: number): Promise<number>;
}
