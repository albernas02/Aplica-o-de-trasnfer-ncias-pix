import express, { Express, NextFunction, Request, Response } from 'express';
import { PixControllers } from '../controllers/PixControllers';
import cors from 'cors';

let server: Express = express();

server.use(cors());
server.use(express.json());

let controller: PixControllers = new PixControllers();

server.get('/users', controller.list);

server.post('/transfer', controller.transfer);

server.get('/transferList/:user/:type', controller.listTransfer);

export default server;