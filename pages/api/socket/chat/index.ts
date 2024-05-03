import { NextApiRequest } from "next";

export default function(req: NextApiRequest, res: any) {
    if(req.method === 'POST'){
        // Get Message
        const message = req.body;
        res?.socket?.server?.io?.emit('message', message);

        res.status(201).json(message);
    }
}