"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const User_1 = require("../models/User");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersController {
    async list(req, res) {
        let name = req.query.name;
        let users = await User_1.User.findBy({
            name: name ? (0, typeorm_1.ILike)(`%${name}%`) : undefined
        });
        return res.status(200).json(users);
    }
    async find(req, res) {
        let user = res.locals.user;
        return res.status(200).json(user);
    }
    async create(req, res) {
        let payload = req.body;
        let password = await bcrypt_1.default.hash(payload.password, 10);
        let user = await User_1.User.create({
            name: payload.name,
            email: payload.email,
            password: password,
        }).save();
        let { password: s, ...userNotPassword } = user;
        return res.status(200).json(userNotPassword);
    }
    async edit(req, res) {
        let payload = req.body;
        let user = res.locals.user;
        let password = await bcrypt_1.default.hash(payload.password, 10);
        user.name = payload.name;
        user.email = payload.email;
        user.password = password;
        await user.save();
        let { password: s, ...userNotPassword } = user;
        return res.status(200).json(userNotPassword);
    }
    async delete(req, res) {
        let user = res.locals.user;
        user.remove();
        return res.status(200).json();
    }
}
exports.UsersController = UsersController;
