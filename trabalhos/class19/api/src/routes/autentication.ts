import {Router} from "express";
import { AutenticationController } from "../controllers/AutenticationController";


let router: Router = Router();
let autenticationController: AutenticationController = new AutenticationController();

router.post('/login', autenticationController.login);

export default router
