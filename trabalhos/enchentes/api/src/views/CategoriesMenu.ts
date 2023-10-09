// import { CategoriesController } from '../controllers/CategoriesController';
// import { Category} from '../models/Category';
// import promptSync from 'prompt-sync';

// const prompt = promptSync();

// export class CategoriesMenu {

//   public controller: CategoriesController;

//   constructor () {
//     this.controller = new CategoriesController();
//   }

//   public show (): void {
//     console.log('[1] - Listar categorias');
//     console.log('[2] - Cadastrar novo categoria');
//     console.log('[3] - Editar categoria');
//     console.log('[4] - Excluir categoria');
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

//     public async list (): Promise<void> {
//       let categories: Category[] = await this.controller.list();
//       console.table(categories);
//     }

//     private async create (): Promise<void> {
//       let description: string = prompt('Descrição da categoria: ');
//       let situation: string = 'A';
//       let category: Category = await this.controller.create(description,situation);
//       console.log(`Categoria ID #${category.id} criado com sucesso!`);
//     }

//   private async edit (): Promise<void> {
//     await this.list();
//     let id: number = Number(prompt('Qual o ID? '));
//     let category: Category | null = await this.controller.find(id);
//     if (category) {
//       let description: string = prompt(`Descrição da categoria: (${category.description})`, category.description);
//       category = await this.controller.edit(category, description);
//       console.log(`Categoria ID #${category.id} atualizado com sucesso!`);
//       category.save();
//     } else {
//       console.log('Categoria não encontrada!');
//     }
//   }

//   private async delete (): Promise<void> {
//     await this.list();
//     let id: number = Number(prompt('Qual o ID? '));
//     let category: Category | null = await this.controller.find(id);
//     if (category) {
//       await this.controller.delete(category);
//       console.log(`Categoria ID #${id} inativada com sucesso!`);
//     } else {
//       console.log('Categoria não encontrada!');
//     }
//   }
// }
