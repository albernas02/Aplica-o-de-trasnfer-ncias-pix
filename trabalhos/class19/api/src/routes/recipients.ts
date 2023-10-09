import {Router} from "express";
import {RecipientsController} from "../controllers/RecipientsController";

let routes: Router = Router();
let controller: RecipientsController = new RecipientsController();

  routes.get('/recipients', controller.list)

  routes.get('/recipients/:id', controller.find)

  routes.post('/recipients', controller.create)

  routes.put('/recipients/:id', controller.edit);

  routes.delete('/recipients/:id', controller.delete);

export default routes

