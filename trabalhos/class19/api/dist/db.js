"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: Boolean(process.env.LOGGING),
    entities: [__dirname + '/models/*.{ts,js}'],
    subscribers: [],
    migrations: [],
});
exports.default = AppDataSource;
