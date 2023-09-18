import { ItemsController } from "../controllers/ItemsController";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class ItemsMenu{

  public controller: ItemsController;

  constructor () {
    this.controller = new ItemsController();
  }

  public show (): void {
    console.log('[5] - Listar itens');
    console.log('[6] - Cadastrar novo item');
    console.log('[7] - Editar item');
    console.log('[8] - Excluir item');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '5':
        await this.list();
        break;
      case '6':
        await this.create();
        break;
      case '7':
        await this.edit();
        break;
      case '8':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let items: Item[] = await this.controller.list();
    console.table(items);
  }

  private async create (): Promise<void> {
    let description: string = prompt('Descrição do item: ');
    let amount: number = Number(prompt('Insira a Quantidade do item'));
    let situation: string = "A";

    let item: Item = await this.controller.create(description, amount, situation);
    console.log(`item ID #${item.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      let description: string = prompt(`Descrição do item: (${item.description})`, item.description);
      let amount: number = Number(prompt(`Quantidade do item: (${item.amount})`));
      item = await this.controller.edit(item, description, amount);
      console.log(`Item ID #${item.id} atualizado com sucesso!`);
      item.save();
    } else {
      console.log('Item não encontrado!');
    }
  }
  private async delete (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      await this.controller.delete(item);
      console.log(`Item ID #${id} inativada com sucesso!`);
    } else {
      console.log('Item não encontrada!');
    }
  }

}
