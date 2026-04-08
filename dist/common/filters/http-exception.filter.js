"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let message;
        let error;
        console.log('🔥 FULL ERROR:', exception);
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
                error = exception.name;
            }
            else {
                message = exceptionResponse.message || exceptionResponse;
                error = exceptionResponse.error || exception.name;
            }
        }
        else if (exception instanceof sequelize_1.DatabaseError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception.message;
            error = exception.name;
            console.log('🔥 SQL:', exception.parent?.sqlMessage);
            console.log('🔥 PARAMETERS:', exception.parent);
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception instanceof Error ? exception.message : exception;
            error = 'Internal Server Error';
        }
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            error,
            message,
        };
        this.logger.error(`${request.method} ${request.url}`, exception instanceof Error ? exception.stack : exception);
        response.status(status).json(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map