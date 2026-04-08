import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    sendVerificationEmail(email: string, code: string): Promise<void>;
    sendPasswordResetEmail(email: string, code: string): Promise<void>;
}
