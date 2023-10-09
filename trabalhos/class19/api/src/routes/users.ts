import { Router, Request, Response, NextFunction } from "express";
import { UsersController } from "../controllers/UsersController";
import { User } from "../models/User";
import { Not } from "typeorm";
import yup from 'yup';

  let routes: Router = Router();
  let controller: UsersController = new UsersController();

  async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        name: yup.string().min(3).max(255).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(16).required(),
    });

    let payload = req.body;

    try{
      req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true });

      return next();
    }catch(error){
      if(error instanceof yup.ValidationError){
        return res.status(400).json({errors: error.errors});
      }
      return res.status(500).json({error: 'Ops algo deu errado'});
    }
}

  async function validateUser(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    let id = Number(req.params.id);
    let user: User| null = await User.findOneBy({id});
    if(!user){
        return res.status(422).json({error: "user not found"});
    }

    res.locals.user = user;

    return next();
}

  async function validateEmail(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    let email: string = req.body.email;
    let id: number|undefined = req.params.id ? Number(req.params.id): undefined;

    let user: User|null = await User.findOneBy({email, id: id? Not(id): undefined});
    if(user){
        return res.status(422).json({error: 'email já cadasatrado'})
    }

    return next();
}

  routes.get('/users', controller.list);

  routes.get('/users/:id', validateUser, controller.find);

  routes.post('/users', validatePayload, validateEmail, controller.create);

  routes.put('/users/:id',validateUser, validatePayload, validateEmail, controller.edit);

  routes.delete('/users/:id', validateUser, controller.delete);

export default routes;

