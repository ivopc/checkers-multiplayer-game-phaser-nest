import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default class CapturePieceRule implements IMovementRule {
  public isMoveValid(board: Board, move: Move): boolean {
    const piece = move.piece;

    if (move.deltaX !== 2 || move.deltaY !== 2) {
      return true;
    }

    const jumpedPiece = board.getJumpedPieceFromMove(move);
    return jumpedPiece !== null && jumpedPiece.color !== piece.color;
  }
}
