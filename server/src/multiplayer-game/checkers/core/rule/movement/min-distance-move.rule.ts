import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class MinDistanceMoveRule implements IMovementRule {
    public isMoveValid(boardEntity: Board, move: Move): boolean {
        return move.deltaX >= 0 && move.deltaY >= 0;
    }
}

export default new MinDistanceMoveRule();