import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class MaxDistanceMoveRule implements IMovementRule {
    // TODO: This will fail king pieces from moving freely
    public isMoveValid(boardEntity: Board, move: Move): boolean {
        return move.deltaX <= 2 && move.deltaY <= 2;
    }
}

export default new MaxDistanceMoveRule();