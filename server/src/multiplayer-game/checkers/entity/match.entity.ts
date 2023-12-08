import Board from "./board.entity";
import CheckersPlayer, { PlayerColor } from "./player.entity";

export default class CheckersMatch {
    /**
     * @description in-memory socket room name
     */
    networkRoomId: string;
    /**
     * @description database generated match ID
     */
    id: number;
    public board: Board;
    public players: CheckersPlayer[];
    public currentTurn: PlayerColor;
    public isFirstMovementOfTurn: boolean = false;

    constructor (networkRoomId) {
        this.networkRoomId = networkRoomId;
        this.players = [];
        /**@todo if server crashes how can we know the current turn? */
        this.currentTurn = PlayerColor.Yellow;
    }

    switchCurrentTurn () {
        this.isFirstMovementOfTurn = true;
        this.currentTurn = this.currentTurn === PlayerColor.Yellow ? PlayerColor.Blue : PlayerColor.Yellow;
    }

    toJSON () {
        return {
            board: (this.board.toJSON() as any) as Board,
            players: (this.players.map(player => player.toJSON()) as any) as CheckersPlayer[],
            currentTurn: this.currentTurn,
        }
    }
};