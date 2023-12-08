import Move from "../../../entity/move.entity";
import { BoardService } from "../../board.service";
import Board from "@/multiplayer-game/checkers/entity/board.entity";

export default abstract class IMovementRule {
    abstract isMoveValid(boardEntity: Board, move: Move): boolean;
}