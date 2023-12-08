import Piece from "./entity/piece.entity";
import { PlayerColor } from "./entity/player.entity";

class GameConfig {
    /**
     * @description The size of the board (8x8 for checkers)
     */
    public boardSize: number = 8;
    public boardMaxTopPosition: number = 0;
    public boardMaxBottomPosition: number = 7;
    public turnTimeLimitSeconds: number = 15;

};

export default new GameConfig();