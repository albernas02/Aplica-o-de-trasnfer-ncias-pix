import {Router} from "express";
import { DcController } from "../controllers/DcsController";

  let routes: Router = Router();
  let controller: DcController = new DcController();

  routes.get('/dcs', controller.list)

  routes.post('/dcs', controller.create)

  routes.put('/dcs/:id', controller.edit);

  routes.delete('/dcs/:id', controller.delete);

export default routes;

