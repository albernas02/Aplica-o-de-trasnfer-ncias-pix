import { Dc } from "../models/Dc";
import { Item } from "../models/Item";


export class DsController{

  async list (): Promise<Dc[]> {
    return await Dc.find();
  }

  async create (town: string): Promise<Dc> {
    return await Dc.create({
      town,
    }).save();
  }
}

