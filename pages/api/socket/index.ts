import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import {Socket} from "net";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO;
        }
    }
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io){
        console.log('Socket Server: Connect Success');
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: 'api/socket'
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default SocketHandler;