import {Request, Response} from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export class AutenticationController{

    async login(req: Request, res: Response): Promise<Response>{
        let {email, password} = req.body;

        let user: User|null = await User.findOne({
            where:{
                email: email
            },
            select: ['id', 'email', 'password']
        });

        if(!user){
            return res.status(401).json({mesage: 'Usuário não encontrado'})
        }

        let result = await bcrypt.compare(password, user.password);

        if (!result){
            return res.status(401).json({mesage: 'Senha inválida'})
        }

        let token: string = Buffer.from(`${email}:${password}`).toString('base64');

        return res.status(200).json({
            token,
            type: 'Basic'
        });
    }

}
