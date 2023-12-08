import Board from "@/multiplayer-game/checkers/entity/board.entity";
import Piece from "@/multiplayer-game/checkers/entity/piece.entity";

export default abstract class IKingmakerRule {
    abstract shouldMakeKing(board: Board, piece: Piece): boolean;
};