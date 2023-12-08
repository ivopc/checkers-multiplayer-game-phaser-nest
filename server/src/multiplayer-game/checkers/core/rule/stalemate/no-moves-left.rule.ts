import IStalemateRule from "./i-stalemate.rule";

import Board from "@/multiplayer-game/checkers/entity/board.entity";
import { RuleManager } from "../RuleManager";
import { PlayerColor } from "../../../entity/player.entity";

class NoMovesLeftRule implements IStalemateRule {
    isStalemate(boardEntity: Board, pieceColor: PlayerColor, ruleManager: RuleManager): boolean {
        const validTeamMoves = ruleManager.findValidMovesForTeam(boardEntity, pieceColor);
        return validTeamMoves.length <= 0;
    }
}

export default new NoMovesLeftRule();