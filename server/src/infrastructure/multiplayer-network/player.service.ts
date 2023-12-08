import { GameType } from '@/multiplayer-game/game-type.enum';
import { Injectable } from '@nestjs/common';

import { Socket } from "socket.io";



export interface PlayerSession {
    id: string;
    currentMatchRoomId: string;
};

export interface NetworkSession {
    gameId: GameType;
    token: string;
    socketSession: string;
};

/**
 * @todo set userId when we can work with it
 */

@Injectable()
export class PlayerService {

    players: Map<string, PlayerSession> = new Map();

    constructor () {
        //setInterval(() => console.log(this.players), 2000);
    }

    setOnline (socketSession: string) {
        this.players.set(socketSession, {
            id: socketSession,
            currentMatchRoomId: ""
        })
    }

    setOffline (socketSession: string) {
        this.players.delete(socketSession);
    }

    getPlayerSession (socketSession: string): PlayerSession {
        return this.players.get(socketSession) as PlayerSession;
    }

    joinMatch (roomId, socket: Socket) {
        const { socketSession } = this.getNetworkSession(socket);
        socket.join(roomId);
        this.players.set(socketSession, { id: socketSession, currentMatchRoomId: roomId });
    }

    leaveMatch (roomId, socket: Socket) {
        const { socketSession } = this.getNetworkSession(socket);
        socket.leave(roomId);
        this.players.set(socketSession, { id: socketSession, currentMatchRoomId: "" });
    }

    isAlreadyInAMatch (socketSession: string): boolean {
        return this.players.get(socketSession)?.currentMatchRoomId !== "";
    }

    getNetworkSession (socket: Socket): NetworkSession {
        return {
            gameId: socket.handshake.query.gameId as GameType,
            token: socket.handshake.auth.token as string,
            socketSession: socket.id
        };
    }
}
