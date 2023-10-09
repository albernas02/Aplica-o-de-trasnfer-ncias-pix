import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

let routes: Router = Router();

  let controller: CategoriesController = new CategoriesController();

  routes.get('/categories', controller.list)

  routes.get('/categories/:id', controller.find)

  routes.post('/categories', controller.create)

  routes.put('/categories/:id', controller.edit);

  routes.delete('/categories/:id', controller.delete);

export default routes

