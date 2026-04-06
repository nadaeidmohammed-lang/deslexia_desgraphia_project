"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const path = require("path");
const sharp = require("sharp");
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        console.log(this.configService.get('AWS_ACCESS_KEY_ID'));
        console.log(this.configService.get('AWS_SECRET_ACCESS_KEY'));
        console.log(this.configService.get('AWS_REGION'));
        console.log(this.configService.get('AWS_S3_BUCKET'));
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
        this.bucket = this.configService.get('AWS_S3_BUCKET');
    }
    async uploadFile(file, folder = 'uploads', options) {
        try {
            this.validateFile(file);
            const fileExtension = path.extname(file.originalname);
            const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
            const key = `${folder}/${fileName}`;
            let buffer = file.buffer;
            let mimeType = file.mimetype;
            if (options?.resize && this.isImage(file.mimetype)) {
                const resizeResult = await this.resizeImage(buffer, options.resize);
                buffer = resizeResult.buffer;
                mimeType = resizeResult.mimeType;
            }
            const uploadParams = {
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
                ACL: 'public-read',
                Metadata: {
                    originalName: file.originalname,
                    uploadedAt: new Date().toISOString(),
                },
            };
            const result = await this.s3.upload(uploadParams).promise();
            return {
                url: result.Location,
                key: result.Key,
                bucket: result.Bucket,
                size: buffer.length,
                mimeType,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to upload file: ${error.message}`);
        }
    }
    async uploadFiles(files, folder = 'uploads', options) {
        const uploadPromises = files.map((file) => this.uploadFile(file, folder, options));
        return Promise.all(uploadPromises);
    }
    async uploadAvatar(file) {
        if (!this.isImage(file.mimetype)) {
            throw new common_1.BadRequestException('Avatar must be an image file');
        }
        return this.uploadFile(file, 'avatars', {
            resize: {
                width: 300,
                height: 300,
                quality: 85,
                format: 'jpeg',
            },
        });
    }
    async uploadStoreLogo(file) {
        if (!this.isImage(file.mimetype)) {
            throw new common_1.BadRequestException('Store logo must be an image file');
        }
        return this.uploadFile(file, 'store-logos', {
            resize: {
                width: 400,
                height: 400,
                quality: 90,
                format: 'png',
            },
        });
    }
    async uploadStoreCover(file) {
        if (!this.isImage(file.mimetype)) {
            throw new common_1.BadRequestException('Store cover must be an image file');
        }
        return this.uploadFile(file, 'store-covers', {
            resize: {
                width: 1200,
                height: 600,
                quality: 85,
                format: 'jpeg',
            },
        });
    }
    async uploadChatAttachment(file) {
        const folder = this.isImage(file.mimetype) ? 'chat-images' : 'chat-files';
        const options = this.isImage(file.mimetype)
            ? {
                resize: {
                    width: 800,
                    height: 600,
                    quality: 80,
                    format: 'jpeg',
                },
            }
            : undefined;
        return this.uploadFile(file, folder, options);
    }
    async deleteFile(key) {
        try {
            await this.s3
                .deleteObject({
                Bucket: this.bucket,
                Key: key,
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to delete file: ${error.message}`);
        }
    }
    async deleteFiles(keys) {
        try {
            if (keys.length === 0)
                return;
            await this.s3
                .deleteObjects({
                Bucket: this.bucket,
                Delete: {
                    Objects: keys.map((key) => ({ Key: key })),
                },
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to delete files: ${error.message}`);
        }
    }
    async getSignedUrl(key, expiresIn = 3600) {
        try {
            return this.s3.getSignedUrl('getObject', {
                Bucket: this.bucket,
                Key: key,
                Expires: expiresIn,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to generate signed URL: ${error.message}`);
        }
    }
    validateFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size exceeds 10MB limit');
        }
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain',
            'text/csv',
            'application/zip',
            'application/x-rar-compressed',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`File type ${file.mimetype} is not allowed`);
        }
    }
    isImage(mimeType) {
        return mimeType.startsWith('image/');
    }
    async resizeImage(buffer, options) {
        try {
            let sharpInstance = sharp(buffer);
            if (options.width || options.height) {
                sharpInstance = sharpInstance.resize(options.width, options.height, {
                    fit: 'cover',
                    position: 'center',
                });
            }
            const format = options.format || 'jpeg';
            const quality = options.quality || 85;
            switch (format) {
                case 'jpeg':
                    sharpInstance = sharpInstance.jpeg({ quality });
                    break;
                case 'png':
                    sharpInstance = sharpInstance.png({ quality });
                    break;
                case 'webp':
                    sharpInstance = sharpInstance.webp({ quality });
                    break;
            }
            const resizedBuffer = await sharpInstance.toBuffer();
            const mimeType = `image/${format}`;
            return { buffer: resizedBuffer, mimeType };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to resize image: ${error.message}`);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map