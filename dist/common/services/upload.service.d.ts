import { ConfigService } from '@nestjs/config';
export interface UploadResult {
    url: string;
    key: string;
    bucket: string;
    size: number;
    mimeType: string;
}
export interface ImageResizeOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpeg' | 'png' | 'webp';
}
export declare class UploadService {
    private configService;
    private s3;
    private bucket;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string, options?: {
        resize?: ImageResizeOptions;
    }): Promise<UploadResult>;
    uploadFiles(files: Express.Multer.File[], folder?: string, options?: {
        resize?: ImageResizeOptions;
    }): Promise<UploadResult[]>;
    uploadAvatar(file: Express.Multer.File): Promise<UploadResult>;
    uploadStoreLogo(file: Express.Multer.File): Promise<UploadResult>;
    uploadStoreCover(file: Express.Multer.File): Promise<UploadResult>;
    uploadChatAttachment(file: Express.Multer.File): Promise<UploadResult>;
    deleteFile(key: string): Promise<void>;
    deleteFiles(keys: string[]): Promise<void>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
    private validateFile;
    private isImage;
    private resizeImage;
}
