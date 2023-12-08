import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import Board from "@/multiplayer-game/checkers/entity/board.entity";
import { PlayerColor } from "@/multiplayer-game/checkers/entity/player.entity";

class ForwardMoveRule implements IMovementRule {
    public isMoveValid(boardEntity: Board, move: Move): boolean {
        const { piece } = move;
        const isTopTeam = piece.color === PlayerColor.Yellow;
        const startPosition = move.from;
        const endPosition = move.to;
        const isCaptureMove = move.deltaX === 2 && move.deltaY === 2;
        const isValid = isTopTeam ? endPosition.y > startPosition.y : endPosition.y < startPosition.y;
        if (piece.isKing || isCaptureMove) {
            return true;
        } else {
            return isValid;
        }
    }
}

export default new ForwardMoveRule();