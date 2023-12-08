import IMovementRule from './iMovementRule';
import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default class MaxDistanceMoveRule implements IMovementRule {
  // TODO: This will fail king pieces from moving freely
  public isMoveValid(board: Board, move: Move): boolean {
    return move.deltaX <= 2 && move.deltaY <= 2;
  }
}
