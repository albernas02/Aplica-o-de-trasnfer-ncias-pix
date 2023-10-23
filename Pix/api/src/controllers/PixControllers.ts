import { Request, Response, NextFunction } from "express";

export class PixControllers {

    async list(req: Request, res: Response): Promise<Response> {
        let response = await fetch('http://177.44.248.24/pix-api/users');
        let users = await response.json();

        return res.status(200).json(users)
    }

    async transfer(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let payload = {
            senderId: body.user,
            recipientId: body.recipient,
            value: body.value
        }

        let response = await fetch('http://177.44.248.24/pix-api/pix', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        let data = await response.json()

        if (response.ok) {
            console.log('q')
            return res.status(200).json({ message: 'Transferência realizada' })
        } else {
            console.log(data)
            return res.status(400).json({ mesage: 'credenciais erradas' })
        }
    }

    async listTransfer(req: Request, res: Response): Promise<Response> {

        let user = req.params.user;
        let type = req.params.type;
        console.log(user, type);

        let response = await fetch(`http://177.44.248.24/pix-api/pix/${user}/${type}`);
        let transfers = await response.json();

        console.log(transfers);
        return res.status(200).json(transfers)
    }
}