import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class InsideBoardMoveRule implements IMovementRule {
    isMoveValid(boardEntity: Board, move: Move): boolean {
        return boardEntity.isValidPosition(move.from) && boardEntity.isValidPosition(move.to);
    }
}

export default new InsideBoardMoveRule();