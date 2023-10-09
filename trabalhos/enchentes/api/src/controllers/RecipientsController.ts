import  express, {Request, Response} from "express";
import cors from 'cors';
import { Recipient } from '../models/Recipient';

export class RecipientsController {

  async list (req: Request, res: Response): Promise<Response>{
    let recipients: Recipient[] = await Recipient.find();
    return res.status(200).json(recipients);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let recipient: Recipient| null = await Recipient.findOneBy({id: id});
    if(!recipient){
        return res.status(422).json({error: "recipient not found"});
    }
    return res.status(200).json(recipient);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let recipient: Recipient = await Recipient.create({
      name : payload.name,
      address : payload.address,
      phone : payload.phone,
      situation : 'a',
      dc_id : payload.dcId,
  })
      console.log('cadastro realizado')
    return res.status(200).json(recipient);
  }


  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id = Number(req.params.id);
    let recipient: Recipient|null = await Recipient.findOneBy({id});
    if(!recipient){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    recipient.name= payload.name;
    recipient.phone= payload.phone;
    recipient.dc_id= payload.dc;
    recipient.situation = 'a';
      return res.status(200).json(recipient);
  }
  async delete (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let recipient: Recipient|null = await Recipient.findOneBy({id});
    if(!recipient){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    recipient.situation = 'i';
    await recipient.save();
    return res.status(200).json();
  }
}
