import Board from "../../entity/board.entity";
import Move from "../../entity/move.entity";
import Piece from "../../entity/piece.entity";
import Vector2 from "../../entity/vector2.entity";
import { PlayerColor } from "../../entity/player.entity";

import IMovementRule from "./movement/i-movement-rule";
import IKingmakerRule from "./kingmaker/i-kingmaker.rule";
import IStalemateRule from "./stalemate/i-stalemate.rule";
import IGameOverRule from "./gameover/i-gameover.rule";

import insideBoardMoveRule from "./movement/inside-board-move.rule";
import emptyCellMoveRule from "./movement/empty-cell-move.rule";
import minDistanceMoveRule from "./movement/min-distance-move.rule";
import maxDistanceMoveRule from "./movement/max-distance-move.rule";
import diagonalMoveRule from "./movement/diagonal-move.rule";
import forwardMoveRule from "./movement/forward-move.rule";
import capturePieceRule from "./movement/capture-piece.rule";

import lastOppositeRowRule from "./kingmaker/last-opposite-row.rule";
import isNotKingRule from "./kingmaker/is-not-king.rule";
import noMovesLeftRule from "./stalemate/no-moves-left.rule";

import noPiecesLeftRule from "./gameover/no-pieces-left.rule";

const movementRules: IMovementRule[] = [
    insideBoardMoveRule,
    emptyCellMoveRule,
    minDistanceMoveRule,
    maxDistanceMoveRule,
    diagonalMoveRule,
    forwardMoveRule,
    capturePieceRule
  ];

const kingmakerRules: IKingmakerRule[] = [
    isNotKingRule,
    lastOppositeRowRule
];

const stalemateRules: IStalemateRule[] = [noMovesLeftRule];

const gameOverRules: IGameOverRule[] = [noPiecesLeftRule];

export class RuleManager {

    public shouldMakeKing(boardEntity: Board, piece: Piece): boolean {
        return kingmakerRules.every(rule => rule.shouldMakeKing(boardEntity, piece));
    }

    public isStalemate(boardEntity: Board, piece: Piece): boolean {
        return stalemateRules.some(rule => rule.isStalemate(boardEntity, piece.color, this));
    }

    public getMatchWinner(boardEntity: Board): PlayerColor | undefined {
        return gameOverRules
            .map(rule => rule.getWinner(boardEntity))
            .find(winner => winner !== undefined);
    }

    public findValidMovesForTeam(boardEntity: Board, teamColor: PlayerColor): Move[] {
        const allValidMoves = this.getAllValidMoves(boardEntity);
        return allValidMoves.filter(move => move.piece.color === teamColor);
    }

    public getAllValidMoves(boardEntity: Board): Move[] {
        const cellsWithValidMoves: Move[] = [];
        const directions: Vector2[] = [
            new Vector2(-1, -1),
            new Vector2(1, -1),
            new Vector2(-1, 1),
            new Vector2(1, 1),
            new Vector2(-2, -2),
            new Vector2(2, -2),
            new Vector2(-2, 2),
            new Vector2(2, 2),
        ];
        boardEntity.getAllCells().forEach(cell => {
            const piece = cell.getPiece();
            if (piece !== null) {
                const validMoves = this.findValidMovesForPiece(boardEntity, piece, directions);
                cellsWithValidMoves.push(...validMoves);
            }
        });
        return cellsWithValidMoves;
    }

    public findValidMovesForPiece(boardEntity: Board, piece: Piece, directions?: Vector2[]): Move[] {
        if (!directions) {
            directions = [
              new Vector2(-1, -1),
              new Vector2(1, -1),
              new Vector2(-1, 1),
              new Vector2(1, 1),
              ...piece.getPossibleCaptureDirections(),
            ];
          }
        const potentialMoves = this.findPotentialMovesForPiece(piece, directions);
        const validMoves: Move[] = [];

        for (const move of potentialMoves) {
            const isMoveValid = movementRules.every(rule => rule.isMoveValid(boardEntity, move));
            if (isMoveValid) validMoves.push(move);
        };

        return validMoves;
    }

    public findPotentialMovesForPiece(piece: Piece, directions: Vector2[]): Move[] {
        const potentialMoves: Move[] = [];
        const currentPosition = piece.position;
        for (const direction of directions) {
            const targetPosition = currentPosition.add(direction);
            potentialMoves.push(new Move(piece, currentPosition, targetPosition));
        }

        return potentialMoves;
    }

    public isMoveValid (move: Move, boardEntity: Board): boolean {
        return movementRules.every(rule => rule.isMoveValid(boardEntity, move));
    }

    public thereIsPossibleCaptureMoveFromPiece (boardEntity: Board, piece: Piece): boolean {
        const possibleMoves = this.findValidMovesForPiece(boardEntity, piece, piece.getPossibleCaptureDirections());
        return possibleMoves.length > 0;
    }
};


export default new RuleManager();