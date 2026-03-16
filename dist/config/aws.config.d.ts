import { ConfigService } from '@nestjs/config';
export declare const awsConfig: (configService: ConfigService) => {
    accessKeyId: any;
    secretAccessKey: any;
    region: any;
    bucket: any;
};
