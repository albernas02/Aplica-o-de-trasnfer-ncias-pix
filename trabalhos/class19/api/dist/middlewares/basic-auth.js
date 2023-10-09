"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function basicAuth(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ mesage: 'Credenciais não informadas' });
    }
    let [type, token] = authorization.split(' ');
    if (!type || type != 'Basic') {
        return res.status(401).json({ mesage: 'Tipo de autenticação invalida' });
    }
    let [email, password] = Buffer.from(token, 'base64').toString('utf8').split(':');
    let user = await User_1.User.findOne({
        where: {
            email: email
        },
        select: ['id', 'email', 'password']
    });
    if (!user) {
        return res.status(401).json({ mesage: 'Autenticação invalida' });
    }
    let result = await bcrypt_1.default.compare(password, user.password);
    console.log(`"${password}"`, user.password, user, result);
    if (!result) {
        return res.status(401).json({ mesage: 'Senha inválida' });
    }
    return next();
}
exports.basicAuth = basicAuth;
