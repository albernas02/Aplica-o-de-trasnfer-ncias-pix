import  express, {Request, Response} from "express";
import cors from 'cors';
import { Dc } from "../models/Dc";

export class DcController{

  async list (req: Request, res: Response): Promise<Response>{
    let dcs: Dc[] = await Dc.find();
    return res.status(200).json(dcs);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let dc: Dc| null = await Dc.findOneBy({id: id});
    if(!dc){
        return res.status(422).json({error: "dc not found"});
    }
    return res.status(200).json(dc);
  }

  async create (req: Request, res: Response): Promise<Response>{
      let payload = req.body;
      let town= payload.town;
      let situation= 'a';

      let dc: Dc = await Dc.create({
        town : town,
        situation : 'a',
  })
        console.log('cadastro realizado')
      return res.status(200).json(dc);
    }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id = Number(req.params.id);
    let dc: Dc|null = await Dc.findOneBy({id});
    if(!dc){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    dc.town = payload.town;
      return res.status(200).json(dc);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let dc: Dc|null = await Dc.findOneBy({id});
    if(!dc){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    dc.situation = 'i';
    return res.status(200).json();
  }
}
