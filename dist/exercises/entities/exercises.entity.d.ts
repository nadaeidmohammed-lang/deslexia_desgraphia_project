import { Model } from 'sequelize-typescript';
export declare class Exercise extends Model<Exercise> {
    id: number;
    title: string;
    type: string;
    content: string;
    imageUrl: string;
    audioUrl: string;
    level: string;
}
