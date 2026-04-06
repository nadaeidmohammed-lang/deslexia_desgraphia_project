"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = (configService) => ({
    dialect: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    autoLoadModels: true,
    synchronize: false,
    logging: configService.get('NODE_ENV') === 'development' ? console.log : false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map