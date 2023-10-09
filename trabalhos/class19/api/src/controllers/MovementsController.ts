import {Request, Response} from "express";
import cors from 'cors';
import { Movement } from '../models/Movement';
import { Recipient } from '../models/Recipient';
import { Item } from '../models/Item';

export class MovementsController {

  async list (req: Request, res: Response): Promise<Response>{
    let movements: Movement[] = await Movement.find();
    return res.status(200).json(movements);
  }

  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let movement: Movement| null = await Movement.findOneBy({id: id});
    if(!movement){
        return res.status(422).json({error: "movement not found"});
    }
    return res.status(200).json(movement);
  }


  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id: number = Number(payload.itemId);
    let item: Item|null = await Item.findOneBy({id: id});
    if(!item){
      return res.status(422).json({error: "Item not found"});
    }


    if(payload.type =='saida'){
      id = Number(payload.recipientId);
      let recipient: Recipient|null = await Recipient.findOneBy({id:id});
      if(!recipient){
        return res.status(422).json({error: "Recipient not found"});
      }
    }else{
      payload.recipientId = null;
    }
    let movement: Movement = await Movement.create({
        user_id: payload.user.id,
        type : payload.type,
        town: payload.town,
        amount: payload.amount,
        item_id: payload.itemId,
        recipient_id: payload.recipientId
      })
      console.log(`Tarefa ID #${movement.id} criada com sucesso!`);
    console.log('cadastro realizado');
    return res.status(200).json(movement);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id: number = Number(req.params.id);
  let movement: Movement | null = await Movement.findOneBy({id: id});
  if (movement) {
    movement.user_id = movement.user_id;
    movement.type = payload.type;
    movement.town = payload.town;
    movement.amount = payload.amount;
    movement.recipient_id = payload.recipientId;
    movement.save();
    } else {
    console.log('Tarefa não encontrada!');
  }
  return res.status(200).json(movement);
  }

  async delete(req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let movement: Movement|null = await Movement.findOneBy({id});
    if(!movement){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    movement.remove();
    return res.status(200).json();
  }
}
