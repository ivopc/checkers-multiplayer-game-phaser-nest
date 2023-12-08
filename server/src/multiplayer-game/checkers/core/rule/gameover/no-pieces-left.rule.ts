import Board from "@/multiplayer-game/checkers/entity/board.entity";
import { PlayerColor } from "@/multiplayer-game/checkers/entity/player.entity";
import IGameOverRule from "./i-gameover.rule";

class NoPiecesLeftRule implements IGameOverRule {
    getWinner(boardEntity: Board): PlayerColor | undefined {
        let winner: PlayerColor | undefined = undefined;
        const allPieces = boardEntity.getAllPieces();
        if (allPieces.filter(piece => piece.color === PlayerColor.Yellow).length === 0) {
            winner = PlayerColor.Blue;
        };
        if (allPieces.filter(piece => piece.color === PlayerColor.Blue).length === 0) {
            winner = PlayerColor.Yellow;
        };
        return winner;
    }
}

export default new NoPiecesLeftRule();