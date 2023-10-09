import  express, {Express} from "express";
import cors from 'cors';
import usersRoutes from './routes/users';
import itemsRoutes from './routes/items';
import dcsRoutes from './routes/dcs';
import categoriesRoutes from './routes/categories';
import recipientsRoutes from './routes/recipients';
import movementsRoutes from './routes/movements';

let server: Express = express();
let port: number = Number(process.env.SERVER_PORT)
server.use(cors());
server.use(express.json())

server.use(usersRoutes);
server.use(itemsRoutes);
server.use(dcsRoutes);
server.use(categoriesRoutes);
server.use(recipientsRoutes);
server.use(movementsRoutes);

export default {
  start(){
    server.listen(3000, () =>{
      console.log(`server started on port 3000`)
    });
  }
};
