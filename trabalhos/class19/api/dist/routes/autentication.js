"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AutenticationController_1 = require("../controllers/AutenticationController");
let router = (0, express_1.Router)();
let autenticationController = new AutenticationController_1.AutenticationController();
router.post('/login', autenticationController.login);
exports.default = router;
