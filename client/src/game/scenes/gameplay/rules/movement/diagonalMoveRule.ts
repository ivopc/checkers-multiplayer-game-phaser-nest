import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default class DiagonalMoveRule implements IMovementRule {
  public isMoveValid(_: Board, move: Move): boolean {
    return move.deltaX === move.deltaY;
  }
}
