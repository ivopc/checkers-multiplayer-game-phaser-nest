import {
    Injectable
} from '@nestjs/common';
import {
    Server,
    Socket
} from 'socket.io';

/**
 * This is just a service to native socket.io rooms peer2peer connection, not only used to games lol
 */


interface RoomDataTransfer {
    roomId: string;
     event: string; 
     data: any;
}

@Injectable()
export class RoomService {
    private server: Server;

    setServer (server: Server) {
        this.server = server;
    }

    public joinRoom(socket: Socket, roomId: string) {
        socket.join(roomId);
    }

    public leaveRoom(socket: Socket, roomId: string) {
        socket.leave(roomId);
    }

    public emitToRoom(data: RoomDataTransfer) {
        this.server.to(data.roomId).emit(data.event, data.data);
    }
}