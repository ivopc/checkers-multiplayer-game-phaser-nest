import IMovementRule from "./i-movement-rule";
import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

class EmptyCellMoveRule implements IMovementRule {
    isMoveValid(boardEntity: Board, move: Move): boolean {
        return !boardEntity.getCellFromPosition(move.from).isEmpty() && boardEntity.getCellFromPosition(move.to).isEmpty();
    }
}

export default new EmptyCellMoveRule();
