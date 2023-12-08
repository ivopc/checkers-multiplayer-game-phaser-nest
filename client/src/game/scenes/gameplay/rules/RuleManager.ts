import _ from 'lodash';
import Board from '../entities/Board';
import Move from '../entities/Move';
import Piece from '../entities/Piece';
import Vector2 from '../../../utils/vector2';
import IMovementRule from './movement/iMovementRule';

import InsideBoardMoveRule from './movement/insideBoardMoveRule';
import EmptyCellMoveRule from './movement/emptyCellMoveRule';
import MinDistanceMoveRule from './movement/minDistanceMoveRule';
import MaxDistanceMoveRule from './movement/maxDistanceMoveRule';
import DiagonalMoveRule from './movement/diagonalMoveRule';
import ForwardMoveRule from './movement/forwardMoveRule';
import CapturePieceRule from './movement/capturePieceRule';
import { PlayerColor } from '../entities/Player';

export default class RuleManager {
  public findValidMovesForTeam(
    board: Board,
    playerColor: PlayerColor,
    isFirstMovementOfTurn: boolean,
  ): Move[] {
    const allValidMoves = this.getAllValidMoves(board).filter(
      (move) => move.piece.color === playerColor,
    );
    if (
      isFirstMovementOfTurn &&
      allValidMoves.some((move) => move.isCaptureMove)
    ) {
      console.log(
        'only capture moves',
        allValidMoves.filter((move) => move.isCaptureMove),
      );
      return allValidMoves.filter((move) => move.isCaptureMove);
    }
    return allValidMoves;
  }

  public getAllValidMoves(board: Board): Move[] {
    const cellsWithValidMoves: Move[] = [];

    board.getAllCells().forEach((cell) => {
      const piece = cell.getPiece();
      if (piece !== null) {
        const validMoves = this.findValidMovesForPiece(board, piece);
        cellsWithValidMoves.push(...validMoves);
      }
    });

    return cellsWithValidMoves;
  }

  public findValidMovesForPiece(
    board: Board,
    piece: Piece,
    directions?: Vector2[],
  ): Move[] {
    if (!directions) {
      directions = [
        new Vector2(-1, -1),
        new Vector2(1, -1),
        new Vector2(-1, 1),
        new Vector2(1, 1),
        ...piece.getPossibleCaptureDirections(),
      ];
    }

    const potentialMoves = this.findPotentialMovesForPiece(
      board,
      piece,
      directions,
    );
    const validMoves: Move[] = [];

    for (const move of potentialMoves) {
      const isMoveValid = movementRules.every((rule: IMovementRule) =>
        rule.isMoveValid(board, move),
      );
      if (isMoveValid) validMoves.push(move);
    }

    return validMoves;
  }

  public findPotentialMovesForPiece(
    board: Board,
    piece: Piece,
    directions: Vector2[],
  ): Move[] {
    const potentialMoves: Move[] = [];
    const currentPosition = board.getPiecePosition(piece);

    if (!piece) throw new Error('Piece is null!');
    if (!currentPosition) throw new Error('Position is null!');

    for (const direction of directions) {
      const targetPosition = currentPosition.add(direction);
      potentialMoves.push(new Move(piece, currentPosition, targetPosition));
    }

    return potentialMoves;
  }
}

const movementRules: IMovementRule[] = [
  new InsideBoardMoveRule(),
  new EmptyCellMoveRule(),
  new MinDistanceMoveRule(),
  new MaxDistanceMoveRule(),
  new DiagonalMoveRule(),
  new ForwardMoveRule(),
  new CapturePieceRule(),
];

export const ruleManager = new RuleManager();
