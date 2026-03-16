import { CreateExerciseDto } from './create-exercises.dto';
declare const UpdateExerciseDto_base: import("@nestjs/common").Type<Partial<CreateExerciseDto>>;
export declare class UpdateExerciseDto extends UpdateExerciseDto_base {
    imageUrl?: string;
    audioUrl?: string;
}
export {};
