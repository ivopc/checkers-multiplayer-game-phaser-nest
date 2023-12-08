import IKingmakerRule from "./i-kingmaker.rule";
import Board from "@/multiplayer-game/checkers/entity/board.entity";
import Piece from "@/multiplayer-game/checkers/entity/piece.entity";

class IsNotKingRule implements IKingmakerRule {
    shouldMakeKing(board: Board, piece: Piece): boolean {
        return !piece.isKing;
    }
}

export default new IsNotKingRule();