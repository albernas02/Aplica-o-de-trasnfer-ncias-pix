import  express, {Request, Response} from "express";
import cors from 'cors';
import { User } from '../models/User';
import { Criptography } from "./Cript";
const crypto: Criptography = new Criptography();

export class UsersController {

  async list (req: Request, res: Response): Promise<Response> {
    let users: User[] = await User.find();
    return res.status(200).json(users);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let user: User| null = await User.findOneBy({id: id});
    if(!user){
        return res.status(422).json({error: "user not found"});
    }
    return res.status(200).json(user);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let password = await crypto.cript(payload.password);
    let user: User = await User.create({
      name : payload.name,
      password : password,
      email : payload.email,
      situation : 'a',
  })
      console.log('cadastro realizado')
    return res.status(200).json(user);
  }

  async edit(req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id = Number(req.params.id);
    let password = await crypto.cript(payload.password);
    let user: User| null = await User.findOneBy({id : id})
      if(!user){
        return res.status(422).json({error: 'Usuário não encontrado'});
      }
      user.name = payload.name,
      user.password = password,
      user.email = payload.email,
      user.situation = 'a',

      console.log('cadastro realizado')
    return res.status(200).json(user);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let user: User|null = await User.findOneBy({id: id});
    if(!user){
      return res.status(422).json({error: 'Usuário não encontrado'});
    };
    user.situation = 'i';
    await user.save();
    return res.status(200).json(user);
  }
}
