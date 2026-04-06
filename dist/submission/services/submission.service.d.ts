import { SubmissionProvider } from '../providers/submission.provider';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { UpdateSubmissionDto } from '../dto';
export declare class SubmissionsService {
    private readonly submissionProvider;
    constructor(submissionProvider: SubmissionProvider);
    submitExercise(dto: CreateSubmissionDto): Promise<import("../entities/submission.entity").Submission>;
    getChildProgress(childId: number): Promise<import("../entities/submission.entity").Submission[]>;
    update(id: number, dto: UpdateSubmissionDto): Promise<import("../entities/submission.entity").Submission>;
}
