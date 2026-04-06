import { Submission } from '../entities/submission.entity';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
export declare class SubmissionProvider {
    private submissionModel;
    constructor(submissionModel: typeof Submission);
    create(dto: CreateSubmissionDto): Promise<Submission>;
    findByChild(childId: number): Promise<Submission[]>;
    findOne(id: number): Promise<Submission>;
}
