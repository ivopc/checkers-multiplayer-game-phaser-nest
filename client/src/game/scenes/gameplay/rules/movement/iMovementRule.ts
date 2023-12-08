import Move from '../../entities/Move';
import Board from '../../entities/Board';

export default interface IMovementRule {
  isMoveValid(board: Board, move: Move): boolean;
}
