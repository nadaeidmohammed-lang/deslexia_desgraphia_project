import { Model } from 'sequelize-typescript';
import { Exercise } from '../../exercises/entities/exercises.entity';
import { Child } from 'src/child/entities/child.entity';
export declare class Submission extends Model<Submission> {
    id: number;
    childId: number;
    exerciseId: number;
    fileUrl: string;
    score: number;
    aiFeedback: string;
    metadata: any;
    child: Child;
    exercise: Exercise;
}
