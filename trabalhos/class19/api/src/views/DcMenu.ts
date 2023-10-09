// import { DcController } from "../controllers/DcsController";
// import { Dc } from "../models/Dc";
// import PromptSync from "prompt-sync";
// const prompt = PromptSync()

// export class DcMenu{
//   public controller: DcController;

//   constructor () {
//     this.controller = new DcController();
//   }

//   public show (): void {
//     console.log('[1] - Listar centros de distribuições');
//     console.log('[2] - Cadastrar novo centro de distribuição');
//     console.log('[3] - Editar centro de distribuição');
//     console.log('[4] - Excluir centro de distribuição');
//   }

//   public async execute (input: string): Promise<void> {
//     switch (input) {
//       case '1':
//         await this.list();
//         break;
//       case '2':
//         await this.create();
//         break;
//       case '3':
//         await this.edit();
//         break;
//       case '4':
//         await this.delete();
//         break;
//     }
//   }

//   public async list (): Promise<void> {
//     let dcs: Dc[] = await this.controller.list();
//     console.table(dcs);
//   }

//   private async create (): Promise<void> {
//     let town: string = prompt('Insira a cidade: ');
//     let situation: string = 'A';
//     let dc: Dc = await this.controller.create(town,situation);
//     console.log(`Centro de distribuição ID #${dc.id} criado com sucesso!`);
//   }

//   private async edit (): Promise<void> {
//     await this.list();
//     let id: number = Number(prompt('Qual o ID? '));
//     let dc: Dc | null = await this.controller.find(id);
//     if (dc) {
//       let town: string = prompt(`Cidade do centro de distribuição: (${dc.town})`, dc.town);
//       dc = await this.controller.edit(dc, town);
//       console.log(`Centro de distribuição ID #${dc.id} atualizado com sucesso!`);
//       dc.save();
//     } else {
//       console.log('Centro de distribuição não encontrado!');
//     }
//   }

//   private async delete (): Promise<void> {
//     await this.list();
//     let id: number = Number(prompt('Qual o ID? '));
//     let dc: Dc | null = await this.controller.find(id);
//     if (dc) {
//       await this.controller.delete(dc);
//       console.log(`Centro de distribuição ID #${id} inativada com sucesso!`);
//     } else {
//       console.log('Centro de distribuição não encontrada!');
//     }
//   }
// }
