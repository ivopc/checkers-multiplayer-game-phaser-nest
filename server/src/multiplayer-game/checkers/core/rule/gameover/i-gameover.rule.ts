import Board from "@/multiplayer-game/checkers/entity/board.entity";
import { PlayerColor } from "@/multiplayer-game/checkers/entity/player.entity";

export default interface IGameOverRule {
    getWinner(boardEntity: Board): PlayerColor | undefined;
};