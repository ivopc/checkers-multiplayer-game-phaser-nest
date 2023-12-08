import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  OnGatewayInit
} from "@nestjs/websockets";

import { MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG } from "./config";

import { PlayerService } from "./player.service";
import { RoomService } from "./room.service";

import { Server, Socket } from "socket.io";

import { GameNetworkEvents } from "./events.enum";

import { GameType } from "@/multiplayer-game/game-type.enum";

interface Auth {
  token: string;
};

interface QueryParams {
  gameId: GameType;
};

@WebSocketGateway(MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG)
export class PlayerGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.roomService.setServer(server);
  }

  constructor (
    private readonly playerService: PlayerService,
    private readonly roomService: RoomService
) {}

  handleConnection (socket: Socket) {
    const { gameId } = (socket.handshake.query as any) as QueryParams;
    const { token } = socket.handshake.auth as Auth;
    /* @todo-db
    if ( !(await this.authService.canJoin(token)) ) {
      throw new WsException("Invalid Token");
    }
    */
    console.log("connected", socket.id, { gameId, token });
    this.playerService.setOnline(socket.id);
    socket.emit(GameNetworkEvents.GameBoot);
  }

  handleDisconnect(socket: Socket) {
    const { socketSession } = this.playerService.getNetworkSession(socket);
    const { currentMatchRoomId } = this.playerService.getPlayerSession(socketSession);
    if (this.playerService.isAlreadyInAMatch(socketSession)) {
      this.roomService.emitToRoom({
        roomId: currentMatchRoomId,
        event: "GameEvents.PlayerDisconected",
        data: {}
      });
    };
    this.playerService.setOffline(socket.id);
  }
  
  @SubscribeMessage(GameNetworkEvents.Ping)
  async ping(@MessageBody() data: null, @ConnectedSocket() socket: Socket): Promise<WsResponse<null>> {
    return { event: GameNetworkEvents.Ping, data: null };
  }
}