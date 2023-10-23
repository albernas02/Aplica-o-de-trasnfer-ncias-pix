import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import pixRoutes from './routes/pix';

const PORT: number = Number(process.env.SERVER_PORT || 3333);

let server: Express = express();

server.use(cors());
server.use(express.json())

server.use((req: Request, res: Response, next: NextFunction) => {
    console.log('[' + (new Date()) + '] ' + req.method + req.url)
    next();
});

server.use(pixRoutes);

export default {
    start() {
        server.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        });
    }
};