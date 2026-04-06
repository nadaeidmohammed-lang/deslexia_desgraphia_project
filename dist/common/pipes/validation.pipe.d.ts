import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype, type }: ArgumentMetadata): Promise<any>;
    private toValidate;
    private formatErrors;
}
