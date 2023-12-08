import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default class InsideBoardMoveRule implements IMovementRule {
  isMoveValid(board: Board, move: Move): boolean {
    return board.isValidPosition(move.from) && board.isValidPosition(move.to);
  }
}
