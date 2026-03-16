import { UploadService, UploadResult } from '../services/upload.service';
import { User } from '../../users/entities/user.entity';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadResult>;
    uploadFiles(files: Express.Multer.File[], folder?: string): Promise<UploadResult[]>;
    uploadAvatar(file: Express.Multer.File, user: User): Promise<UploadResult>;
    uploadStoreLogo(file: Express.Multer.File): Promise<UploadResult>;
    uploadStoreCover(file: Express.Multer.File): Promise<UploadResult>;
    uploadChatAttachment(file: Express.Multer.File): Promise<UploadResult>;
}
