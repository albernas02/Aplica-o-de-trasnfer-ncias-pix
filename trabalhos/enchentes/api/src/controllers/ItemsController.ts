import  express, {Request, Response} from "express";
import cors from 'cors';
import { Category } from "../models/Category";
import { Item } from "../models/Item";

export class ItemsController{

  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let item: Item| null = await Item.findOneBy({id: id});
    if(!item){
        return res.status(422).json({error: "item not found"});
    }
    return res.status(200).json(item);
  }

  async list (req: Request, res: Response): Promise<Response>{
    let items: Item[] = await Item.find();
    return res.status(200).json(items);
  }

  async create(req: Request, res: Response): Promise<Response>{
      let payload = req.body;
      let id = payload.category_id
      let category: Category| null = await Category.findOneBy(id)
      if(!category){
        return res.status(422).json({error: 'Item não encontrado'});
      }

      let item: Item = await Item.create({
        description : payload.description,
        amount : payload.amount,
        situation : "a",
        category_id : id,
    })
        console.log('cadastro realizado')
      return res.status(200).json(item);
    }

  async edit (req: Request, res: Response): Promise<Response>{
      let payload = req.body;
      let id = Number(req.params.id);
      let item: Item|null = await Item.findOneBy({id});
      payload.description = payload.description;
      payload.amount = payload.amount;
      payload.categoryId = payload.categoryId;
      payload.situation = 'a';
      if(!item){
        return res.status(422).json({error: 'Item não encontrado'});
      }
        return res.status(200).json(item);
    }

  async delete (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let item: Item|null = await Item.findOneBy({id});
    if(!item){
      return res.status(422).json({error: 'Item não encontrado'});
    }
    item.situation = 'i';
    return res.status(200).json();
  }
}
