import { User } from '../models/User';
import { Md5} from 'ts-md5';
import SHA1 from 'tshash/SHA1';
import {ParallelHasher} from 'ts-md5';

export class UsersController {

  async list (): Promise<User[]> {
    return await User.find();
  }

  async create (name: string, password: any, email: string, situation: string): Promise<User> {
    return await User.create({
      name,
      password,
      email,
      situation,
    }).save();
  }

  async find (id: number): Promise<User|null> {
    return await User.findOneBy({ id });
  }

  async edit (user: User, name: string, password: any, email: string, situation: string): Promise<User> {
    user.name = name;
    user.email = email;
    user.password = password;
    user.situation = situation;
    await user.save();

    return user;
  }

  async delete (user: User): Promise<void> {
    user.situation = 'I';
    await user.save();
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
