import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class CapturePieceRule implements IMovementRule {
    public isMoveValid(boardEntity: Board, move: Move): boolean {
        const { piece } = move;

        if (move.deltaX !== 2 || move.deltaY !== 2) {
            return true;
        };
        const jumpedPiece = boardEntity.getJumpedPieceFromMove(move);
        return jumpedPiece !== null && jumpedPiece.color !== piece.color;
    }
}

export default new CapturePieceRule();