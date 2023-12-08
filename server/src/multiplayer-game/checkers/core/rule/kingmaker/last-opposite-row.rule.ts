import IKingmakerRule from "./i-kingmaker.rule";
import Board from "@/multiplayer-game/checkers/entity/board.entity";
import Piece from "@/multiplayer-game/checkers/entity/piece.entity";

class LastOppositeRowRule implements IKingmakerRule {
    shouldMakeKing(board: Board, piece: Piece): boolean {
        return board.isPieceMaxForwardPosition(piece);
    }
}

export default new LastOppositeRowRule();