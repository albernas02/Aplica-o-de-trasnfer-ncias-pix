import { Md5} from 'ts-md5';
import SHA1 from 'tshash/SHA1';
import {ParallelHasher} from 'ts-md5';
import { Recipient } from '../models/Recipient';

export class RecipientsController {

  async list (): Promise<Recipient[]> {
    return await Recipient.find();
  }

  async create (name: string, phone: string, situation: string): Promise<Recipient> {
    return await Recipient.create({
      name,
      phone,
    }).save();
  }

  async find (id: number): Promise<Recipient|null> {
    return await Recipient.findOneBy({ id });
  }

  async edit (recipient: Recipient, name: string, phone: string, situation: string): Promise<Recipient> {
    recipient.name = name;
    recipient.phone = phone;
    // recipient.items = items;
    recipient.situation = situation;
    await recipient.save();

    return recipient;
  }

  async delete (recipient: Recipient): Promise<void> {
    recipient.situation = 'I';
    await recipient.save();
  }

  public dataCryptography = {
    algorithm : "aes256",
    secret : "chaves",
    type : "hex"
  };
  cript(password: string) {

    const crypto = require("crypto");
    const cipher = crypto.createCipher(this.dataCryptography.algorithm, this.dataCryptography.secret);

	  cipher.update(password);
	  return cipher.final(this.dataCryptography.type);
  };
}
