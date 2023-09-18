import { Dc } from "../models/Dc";
import { Item } from "../models/Item";
import { Recipient } from "../models/Recipient";
import { User } from "../models/User";


export class DcController{
  find(id: number): Dc | PromiseLike<Dc | null> | null {
    throw new Error("Method not implemented.");
  }
  async list (): Promise<Dc[]> {
    return await Dc.find();
  }

  async create (town: string, situation: string, item_id: number, users_id: number, recipients_id: number, ): Promise<Dc> {

    let item: Item | null = await Item.findOneBy({ id: item_id });
    if (! item){
      throw new Error('Item não encontrado')
    }
    let user: User | null = await User.findOneBy({ id: users_id });
    if (! user){
      throw new Error('Usuário não encontrado')
    }

    let recipient: Recipient | null = await Recipient.findOneBy({ id: recipients_id });
    if (! recipient){
      throw new Error('Beneficiário não encontrado')
    }

    return await Dc.create({
      town : town,
      situation: situation,
      item : item,
      user : user,
      recipient : recipient,
    }).save();
  }

  async edit (dc: Dc, town: string, item_id: number, users_id: number, recipients_id: number): Promise<Dc> {

    let item: Item | null = await Item.findOneBy({ id: item_id });
    if (! item){
      throw new Error('Item não encontrado')
    }
    let user: User | null = await User.findOneBy({ id: users_id });
    if (! user){
      throw new Error('Usuário não encontrado')
    }

    let recipient: Recipient | null = await Recipient.findOneBy({ id: recipients_id });
    if (! recipient){
      throw new Error('Beneficiário não encontrado')
    }

    dc.town = town;
    dc.item = item;
    dc.user = user;
    dc.recipient = recipient;
    await dc.save();
    return dc;
  }

  async delete (dc: Dc): Promise<void> {
    dc.situation = 'I'
    await dc.save();
  }
}
