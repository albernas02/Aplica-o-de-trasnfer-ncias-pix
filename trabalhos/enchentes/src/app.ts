import DB from './db';
import { UsersMenu } from './views/UsersMenu';
import { CategoriesMenu } from './views/CategoriesMenu';
import { MovementsMenu } from './views/MovementsMenu';
import { ItemsMenu } from './views/ItemsMenu';
import { RecepientsMenu } from './views/RecepientsMenu';
import promptSync from 'prompt-sync';
import { DcMenu } from './views/DcMenu';

const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();


  // Inicializa os menus
  let usersMenu: UsersMenu = new UsersMenu();
  let categoriesMenu: CategoriesMenu = new CategoriesMenu();
  let movementsMenu: MovementsMenu = new MovementsMenu();
  // let dcsMenu: DcMenu = new DcMenu();
  let recipientsMenu: RecepientsMenu = new RecepientsMenu();
  let itemsMenus: ItemsMenu = new ItemsMenu();

  let control: string = '';
  let input: string = '';

  let user = usersMenu.loginMenu()
  do{
    console.log('Bem vindo');
    console.log('1 acessar menu de usuario');
    console.log('2 acessar menu de centros de distribuições');
    console.log('3 acessar menu de categotias');
    console.log('4 acessar menu de items');
    console.log('5 acessar menu de beneficiários');
    console.log('6 acessar menu de movimentações');
    console.log('0 sair');
    control = prompt('Insira a opção desejada')
    if(control = '1'){
      do{
      usersMenu.show();
      input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
      await usersMenu.execute(input);
    }while(input != '0')
  }
  //   if(control = '2'){
  //     do{
  //     dcsMenu.show();
  //     input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
  //     await dcsMenu.execute(input);
  //   }while(input != '0')
  // }
    if(control = '3'){
      do{
      categoriesMenu.show();
      input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
      await categoriesMenu.execute(input);
    }while(input != '0')
  }
    if(control = '4'){
      do{
      itemsMenus.show();
      input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
      await itemsMenus.execute(input);
    }while(input != '0')
  }
    if(control = '5'){
      do{
      recipientsMenu.show();
      input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
      await recipientsMenu.execute(input);
    }while(input != '0')
  }
    if(control = '6'){
      do{
      movementsMenu.show();
      input = prompt('Insira o opção desejada ou 0 para voltar ao menu anterior');
      await movementsMenu.execute(input, await user);
    }while(input != '0')
  }
  }while(control!= '0')


  // do{
  //   let user = usersMenu.loginMenu()
  //   if(await user){

  //     do {
  //       console.clear();

  //       usersMenu.show();0
  //       categoriesMenu.show();
  //       movementsMenu.show();
  //       recipientsMenu.show();
  //       itemsMenus.show();
  //       console.log('0 - Sair');

  //       input = prompt('Selecione a opção desejada: ');

  //       if (input != '0') {

  //         await usersMenu.execute(input);
  //         await categoriesMenu.execute(input);
  //         await movementsMenu.execute(input, await user);
  //         await recipientsMenu.execute(input);
  //         await itemsMenus.execute(input);

  //         prompt('Pressione enter para continuar');
  //       }
  //     } while (input != '0');
  //   }else{
  //     console.log('Usuário ou senha incorretos');
  //     input = prompt('Aperte [ENTER] para continuar ou [0] sair: ');
  //   }
  // }while (input != '0');
}
main();
