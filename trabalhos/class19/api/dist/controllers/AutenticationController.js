"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationController = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AutenticationController {
    async login(req, res) {
        let { email, password } = req.body;
        let user = await User_1.User.findOne({
            where: {
                email: email
            },
            select: ['id', 'email', 'password']
        });
        if (!user) {
            return res.status(401).json({ mesage: 'Usuário não encontrado' });
        }
        let result = await bcrypt_1.default.compare(password, user.password);
        if (!result) {
            return res.status(401).json({ mesage: 'Senha inválida' });
        }
        let token = Buffer.from(`${email}:${password}`).toString('base64');
        return res.status(200).json({
            token,
            type: 'Basic'
        });
    }
}
exports.AutenticationController = AutenticationController;
