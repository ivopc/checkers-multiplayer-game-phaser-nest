import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
  WsException
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG } from "./config";

import { MatchService } from './match.service';
import { RoomService } from "./room.service";
import { PlayerService } from "./player.service";

import { GameNetworkEvents } from "./events.enum";

export interface JoinMatchData {
  game: number;
}

@WebSocketGateway(MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG)
export class MatchGateway {
  @WebSocketServer()
  server: Server;

  constructor (
      private readonly matchService: MatchService,
      private readonly roomService: RoomService,
      private readonly playerService: PlayerService
  ) {}

  @SubscribeMessage(GameNetworkEvents.MatchMaking)
  async matchMaking(
      @MessageBody() data: null,
      @ConnectedSocket() socket: Socket,
  )  {
      const { socketSession, gameId } = this.playerService.getNetworkSession(socket);
      if (this.playerService.isAlreadyInAMatch(socketSession)) {
        throw new WsException("You're already in a match!");
      };
      const { someoneWaiting, match } = await this.matchService.matchMaking(gameId, socketSession);
      if (someoneWaiting) {
        this.roomService.emitToRoom({
            roomId: match.networkRoomId,
            event: GameNetworkEvents.MatchBoot, 
            data: { match: match.toJSON() }
          });
        this.playerService.joinMatch(match.networkRoomId, socket);
        socket.emit(GameNetworkEvents.MatchBoot, { match: match.toJSON(), someoneWaiting });
        this.matchService.dispatchEvents(gameId, match.networkRoomId);
      } else {
        this.playerService.joinMatch(match.networkRoomId, socket);
        socket.emit(GameNetworkEvents.MatchBoot, { someoneWaiting });
      };
  }

  @SubscribeMessage(GameNetworkEvents.LeftMatch)
  async left (
      @MessageBody() data: null, 
      @ConnectedSocket() socket: Socket
  ) {
    /**
     * @todo
     * what do we need to do if a player get disconnected from match?
     * maybe in future player can join two concurrent pvp games?
     */
    /*const { socketSession } = this.playerService.getNetworkSession(socket);
    this.playerService.leaveMatch(
      this.playerService.getCurrentMatchRoom(socketSession), 
      socket
     );*/
  }
}
