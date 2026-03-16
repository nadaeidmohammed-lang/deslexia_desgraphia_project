import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { SubmissionsService } from '../services/submission.service';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(dto: CreateSubmissionDto): Promise<import("../entities/submission.entity").Submission>;
    getProgress(childId: number): Promise<import("../entities/submission.entity").Submission[]>;
}
