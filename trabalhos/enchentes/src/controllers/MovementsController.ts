import { Between, Not } from 'typeorm';
import { Category } from '../models/Category';
import { Movement } from '../models/Movement';
import { User } from '../models/User';

export class MovementsController {
  async list (): Promise<Movement[]> {
    return await Movement.find();
  }

  async create (userId: number, type: string,town: string, amount: number, categoryId: number): Promise<Movement> {
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Categoria não encontrado!');
    }

    return await Movement.create({
      type: type,
      town : town,
      amount: amount,
      user_id: userId,
      category_id: categoryId,
    }).save();
  }

  async find (id: number): Promise<Movement|null> {
    return await Movement.findOneBy({ id });
  }

  async edit (movements: Movement,userId: number, type: string,town: string, amount: number,  categoryId: number): Promise<Movement> {
    let movement: Movement | null = await Movement.findOneBy({ id: movements.id });
    if (! movement) {
      throw new Error('Tarefa não encontrada!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Tarefa não encontrada!');
    }

    movement.user_id = userId;
    movement.type = type;
    movement.town = town;
    movement.category_id = categoryId;
    movement.save();

    return movement;
  }

  async delete (task: Movement): Promise<void> {
    await task.remove();
  }
}
