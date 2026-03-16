"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = void 0;
const awsConfig = (configService) => ({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
    bucket: configService.get('AWS_S3_BUCKET'),
});
exports.awsConfig = awsConfig;
//# sourceMappingURL=aws.config.js.map