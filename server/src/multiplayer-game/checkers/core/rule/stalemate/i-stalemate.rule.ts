import Board from "@/multiplayer-game/checkers/entity/board.entity";
import { RuleManager } from "../RuleManager";
import { PlayerColor } from "../../../entity/player.entity";

export default interface IStalemateRule {
    isStalemate(boardEntity: Board, pieceColor: PlayerColor, ruleManager: RuleManager): boolean;
}