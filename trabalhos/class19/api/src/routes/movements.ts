import  express, {Express, Request, Response, Router} from "express";
import { MovementsController } from "../controllers/MovementsController";

let routes: Router = Router();
let controller: MovementsController = new MovementsController();

  routes.get('/movements', controller.list);

  routes.get('/movements:id', controller.find);

  routes.post('/movements', controller.create);

  routes.put('/movements/:id', controller.edit);

  routes.delete('/movements/:id', controller.delete);

export default routes;

