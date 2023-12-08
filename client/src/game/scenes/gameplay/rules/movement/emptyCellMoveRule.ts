import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default class EmptyCellMoveRule implements IMovementRule {
  isMoveValid(board: Board, move: Move): boolean {
    return (
      !board.getCellFromPosition(move.from).isEmpty() &&
      board.getCellFromPosition(move.to).isEmpty()
    );
  }
}
