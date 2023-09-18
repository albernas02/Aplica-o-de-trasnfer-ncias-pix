import { Item } from "../models/Item";

export class ItemsController{
  find(id: number): Item | PromiseLike<Item | null> | null {
    throw new Error("Method not implemented.");
  }

  async list (): Promise<Item[]> {
    return await Item.find();
  }

  async create (description: string, amount: number, situation: string): Promise<Item> {
    return await Item.create({
      description,
      amount,
      situation,
    }).save();
  }

  async edit (item: Item, description: string, amount: number): Promise<Item> {
    item.description = description;
    item.amount = amount,
    await item.save();
    return item;
  }
  async delete (item: Item): Promise<void> {
    await item.save();
  }

}
