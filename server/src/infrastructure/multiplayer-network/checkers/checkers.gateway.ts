import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
  WsException,
  OnGatewayInit
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


import { RoomService } from "../room.service";
import { PlayerService } from "../player.service";
import { CheckersMatchService } from "./checkers-match.service";
import { GameplayManagerService } from "@/multiplayer-game/checkers/core/gameplay-manager.service";
import { TimerService } from "@/multiplayer-game/timer.service";

import { PlayerColor } from "@/multiplayer-game/checkers/entity/player.entity";


import { GameNetworkEvents, CheckersEvents } from '../events.enum';
import CheckersMatch from "@/multiplayer-game/checkers/entity/match.entity";
import Vector2 from "@/multiplayer-game/checkers/entity/vector2.entity";
import { MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG } from "../config";

export interface PiecePositionRequest {
  from: Vector2;
  to: Vector2;
}

export interface TurnResults {
  move?: PiecePositionRequest;
  nextTurn?: PlayerColor;
  captured?: boolean;
  makeKing?: boolean;
  jumpTurnDueInactivity?: boolean;
  winner?: PlayerColor;
  error?: boolean;
  errorId?: number;
}


@WebSocketGateway(MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG)
export class CheckersGateway {
  @WebSocketServer()
  server: Server;

  constructor (
    private readonly matchService: CheckersMatchService,
    private readonly gameplayManagerService: GameplayManagerService,
    private readonly roomService: RoomService,
    private readonly playerService: PlayerService,
    private readonly timerService: TimerService
) {}


  @SubscribeMessage(CheckersEvents.RequestPieceMovement)
  async pieceMovement(
    @MessageBody() data: PiecePositionRequest, 
    @ConnectedSocket() socket: Socket
  )  {
    const match = this.matchService.matches.get(this.playerService.getPlayerSession(socket.id).currentMatchRoomId) as CheckersMatch;
    try {
      const turnResults = await this.gameplayManagerService.executePieceMove(data, match);
      this.roomService.emitToRoom({
        roomId: match.networkRoomId,
        event: CheckersEvents.TurnResults,
        data: turnResults
      });
      this.gameplayManagerService.initEvents(match.networkRoomId);
    } catch (err) {
      console.error(err);
      socket.emit(CheckersEvents.TurnResults, { error: true });
    };
  }
}
