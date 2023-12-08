import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class DiagonalMoveRule implements IMovementRule {
    public isMoveValid(boardEntity: Board, move: Move): boolean {
        return move.deltaX === move.deltaY;
    }
};

export default new DiagonalMoveRule();