require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'sequel_user',
    password: process.env.DB_PASSWORD || 'Ava_432004',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'qupedia_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database:
      process.env.DB_DATABASE_TEST ||
      process.env.DB_NAME_TEST ||
      'qupedia_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
};
