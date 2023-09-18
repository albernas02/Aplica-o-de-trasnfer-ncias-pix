import { RecipientsController } from '../controllers/RecipientsController';
import { Recipient } from '../models/Recipient';
import { User } from '../models/User';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class RecepientsMenu {

  public controller: RecipientsController;

  constructor () {
    this.controller = new RecipientsController();
  }

  public show (): void {
    console.log('[1] - Listar beneficiários');
    console.log('[2] - Cadastrar novo beneficiário');
    console.log('[3] - Editar beneficiário');
    console.log('[4] - Excluir beneficiário');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '1':
        await this.list();
        break;
      case '2':
        await this.create();
        break;
      case '3':
        await this.edit();
        break;
      case '4':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let recipients: Recipient[] = await this.controller.list();
    console.table(recipients);
  }

  private async create (): Promise<void> {
    let name: string = prompt('Nome: ');
    let phone: string = prompt('Telefone: ');
    let situation: string = 'A';
    // let items: string[] = prompt('Itens recebidos: ');
    let recipient: Recipient = await this.controller.create(name, phone, situation);
    console.log(`Beneficiário ID #${recipient.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let recipient: Recipient | null = await this.controller.find(id);
    if (recipient) {
      let name = prompt(`Nome (${recipient.name}): `, recipient.name);
      let phone = prompt(`Telefone (${recipient.phone}): `, recipient.phone);
      let situation = prompt(`Situação (${recipient.situation}): `, recipient.situation);
      recipient = await this.controller.edit(recipient, name, phone, situation);
      console.log(`Beneficiário ID #${recipient.id} atualizado com sucesso!`);
    } else {
      console.log('Beneficiário não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    this.list();
    let id: number = Number(prompt('Qual o ID? '));
    let recipient: Recipient | null = await this.controller.find(id);
    if (recipient) {
      await this.controller.delete(recipient);
      console.log(`Centro de distribuição ID #${id} inativado com sucesso!`);
    } else {
      console.log('Centro de distribuição não encontrado!');
    }
  }
}
