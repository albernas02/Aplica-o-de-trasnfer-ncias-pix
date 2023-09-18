import {MovementsController } from '../controllers/MovementsController';
import { User } from '../models/User';
import promptSync from 'prompt-sync';
import { Movement} from '../models/Movement';

const prompt = promptSync();

export class MovementsMenu {

  public controller: MovementsController;

  constructor () {
    this.controller = new MovementsController();
  }

  public show (): void {
    console.log('[9] - Listar movimentações');
    console.log('[10] - Cadastrar novo movimentação');
    console.log('[11] - Editar movimentação');
    console.log('[12] - Excluir movimentação');
  }

  public async execute (input: string, user: User| null): Promise<void> {
    switch (input) {
      case '9':
        await this.list( user);
        break;
      case '10':
        if(user){
        await this.create(user);
        }
        break;
      case '11':
        if(user){
          await this.edit(user);
          }
        break;
      case '12':
        await this.delete();
        break;
    }
  }

  private async list (user: User | null): Promise<void> {
    let control: string = '';
    let tasks: Movement[] = await this.controller.list();

    do{
      console.log('[1] Exibir todas as movimentações');
      console.log('[2] Exibir movimentações por categoria');
      console.log('[3] Exibir movimentações por período');
      console.log('[4] Exibir movimentações por situação');
      console.log('[5] Exibir movimentações por tipo');
      console.log('[6] Exibir movimentações por cidade');
      console.log('[0] voltar ao menu anterior');
      control = prompt('Insira a opção desejada ');
      switch(control){
        case '1':
          console.table(Movement);
        break;
        case'2':
          let category : number = Number(prompt('Insira o id da categoria '));
          let categories : Movement[] = await Movement.find({
            where: {
              category_id: category
            }
          });
          console.table(categories);
        break;
        case '3':
          let start: Date = new Date();
          let end: Date = new Date(prompt('Insira a data no formato yyyy/mm/dd '));
          let periods : Movement[] = await Movement.find();
          console.table(periods);
        break
        case '4':
          let situation: string = prompt('Informe a situação que deseja');
          let situations: Movement[] = await Movement.find()
          console.table(situations)
        break
        case '5':
          let creators: Movement[] = await Movement.find({
            where:{
              user_id : user?.id
            }
          })
          console.table(creators);
        break
      }
    }while( control != '0');
  }

  private async create (user: User): Promise<void> {
    let userId: number = user.id;
    let type: string = prompt('Ação realizada(entrada ou saída): ');
    let town: string = prompt('Cidade: ');
    let amount: number =Number (prompt('Quantidade: '));
    let categoryId: number = Number(prompt('ID da categoria: '));
    try {
      let task: Movement = await this.controller.create(userId, type, town, amount, categoryId);
      console.log(`Tarefa ID #${task.id} criada com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit (user: User): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let movement: Movement | null = await this.controller.find(id);
    if (movement) {
      let userId: number = user.id;
      let type: string = prompt('Ação realizada(entrada ou saída): ');
      let town: string = prompt('Cidade: ');
      let categoryId: number = Number(prompt('ID da categoria: '));
      let amount: number = Number(prompt('Quantidade: '));
      movement.save();
      try {
        movement = await this.controller.edit(movement, userId, type, town, amount, categoryId);
        console.log(`Movimentação ID #${movement.id} atualizada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }

    } else {
      console.log('Tarefa não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let movement: Movement | null = await this.controller.find(id);
    if (movement) {
      await this.controller.delete(movement);
      console.log(`Tarefa ID #${id} excluída com sucesso!`);
    } else {
      console.log('Tarefa não encontrada!');
    }
  }
}
