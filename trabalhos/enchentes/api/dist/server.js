"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const autentication_1 = __importDefault(require("./routes/autentication"));
const basic_auth_1 = require("./middlewares/basic-auth");
const PORT = Number(process.env.SERVER_PORT || 3000);
let server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((req, res, next) => {
    console.log('[' + (new Date()) + ']' + req.method + req.url);
    next();
});
server.use(autentication_1.default);
server.use(basic_auth_1.basicAuth, users_1.default);
exports.default = {
    start() {
        server.listen(PORT, () => {
            console.log(`server started on port 3000`);
        });
    }
};
