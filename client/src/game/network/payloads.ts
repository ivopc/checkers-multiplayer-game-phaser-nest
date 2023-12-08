import Vector2 from '../utils/vector2';
import { PlayerColor } from '../scenes/gameplay/entities/Player';
import Player from '../scenes/gameplay/entities/Player';
import Piece from '../scenes/gameplay/entities/Piece';
import { PiecePositionRequest } from '../scenes/gameplay/entities/Piece';

export interface NetworkBootData {
  isReconnection: boolean;
}

export interface Match {
  board: {
    pieces: Piece[];
  };
  players: Player[];
  currentTurn: PlayerColor;
}

export interface MatchBootData {
  someoneWaiting: boolean;
  match: Match;
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
