import  express, {Router} from "express";
import { ItemsController } from "../controllers/ItemsController";

let routes: Router = Router()

  let controller: ItemsController = new ItemsController();

  routes.get('/items', controller.list)

  routes.get('/items/:id', controller.find)

  routes.post('/items', controller.create)

  routes.put('/items/:id', controller.edit);

  routes.delete('/items/:id', controller.delete);

export default routes;

