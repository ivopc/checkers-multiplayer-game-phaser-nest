import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';
import { PlayerColor } from '../../entities/Player';

export default class ForwardMoveRule implements IMovementRule {
  public isMoveValid(board: Board, move: Move): boolean {
    const { piece } = move;
    const isTopTeam = piece.color === PlayerColor.Yellow;
    const startPosition = move.from;
    const endPosition = move.to;
    const { isCaptureMove } = move;
    const isValid = isTopTeam
      ? endPosition.y > startPosition.y
      : endPosition.y < startPosition.y;

    if (piece.isKing || isCaptureMove) {
      return true;
    } else {
      return isValid;
    }
  }
}
