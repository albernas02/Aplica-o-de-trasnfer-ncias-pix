import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export async function basicAuth(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    let authorization = req.headers.authorization;
    
    if(! authorization){
        return res.status(401).json({mesage: 'Credenciais não informadas'});
    }

    let [type, token] = authorization.split(' ');

    if(!type || type != 'Basic'){
        return res.status(401).json({mesage: 'Tipo de autenticação invalida'});
    }

    let [email, password] = Buffer.from(token, 'base64').toString('utf8').split(':');
        
    let user: User|null = await User.findOne({
        where:{
            email: email
        },
        select: ['id', 'email', 'password']
    });
        
    if(!user){
        return res.status(401).json({mesage: 'Autenticação invalida'})
    }
    
    let result = await bcrypt.compare(password, user.password);

    console.log(`"${password}"`, user.password, user, result)
    
    if (!result){
        return res.status(401).json({mesage: 'Senha inválida'})
    }

    return next();
}