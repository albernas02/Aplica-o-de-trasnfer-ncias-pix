import  express, {Request, Response} from "express";
import cors from 'cors';
import { Category} from '../models/Category';

export class CategoriesController {

  async list (req: Request, res: Response): Promise<Response>{
    let categories: Category[] = await Category.find();
    return res.status(200).json(categories);
  }
  
  async find (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);

    let category: Category| null = await Category.findOneBy({id: id});
    if(!category){
        return res.status(422).json({error: "category not found"});
    }
    return res.status(200).json(category);
  }

  async create (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let description= payload.description;
    let situation= 'a';

    let category: Category = await Category.create({
      description : description,
      situation : payload.situation,
  })
      console.log('cadastro realizado')
    return res.status(200).json(category);
  }

  async edit (req: Request, res: Response): Promise<Response>{
    let payload = req.body;
    let id = Number(req.params.id);
    let category: Category|null = await Category.findOneBy({id});
    if(!category){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    category.description = payload.description;

    return res.status(200).json(category);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let id = Number(req.params.id);
    let category: Category|null = await Category.findOneBy({id});
    if(!category){
      return res.status(422).json({error: 'Usuário não encontrado'});
    }
    category.situation = 'i';
    return res.status(200).json();
  }
}
