"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const yup = __importStar(require("yup"));
const User_1 = require("../models/User");
const typeorm_1 = require("typeorm");
async function validatePayload(req, res, next) {
    let schema = yup.object({
        name: yup.string().min(3).max(255).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(16).required(),
    });
    let payload = req.body;
    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true });
        return next();
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ error: 'Ops algo deu errado' });
    }
    return res.status(200);
}
async function validateUser(req, res, next) {
    let id = Number(req.params.id);
    let user = await User_1.User.findOneBy({ id });
    if (!user) {
        return res.status(422).json({ error: "user not found" });
    }
    res.locals.user = user;
    return next();
}
async function validateEmail(req, res, next) {
    let email = req.body.email;
    let id = req.params.id ? Number(req.params.id) : undefined;
    let user = await User_1.User.findOneBy({ email, id: id ? (0, typeorm_1.Not)(id) : undefined });
    if (user) {
        return res.status(422).json({ error: 'email já cadasatrado' });
    }
    return next();
}
let routes = (0, express_1.Router)();
let userController = new UsersController_1.UsersController();
routes.get('/users', userController.list);
routes.get('/users/:id', validateUser, userController.find);
routes.post('/users', validatePayload, validateEmail, userController.create);
routes.put('/users/:id', validateUser, validatePayload, validateEmail, userController.edit);
routes.delete('/users/:id', validateUser, userController.delete);
exports.default = routes;
