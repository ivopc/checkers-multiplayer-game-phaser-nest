import { PlayerColor } from "./player.entity";
import Vector2 from "./vector2.entity";

export enum PieceType {
    Normal = "Normal",
    King = "King"
};

export default class Piece {
    /**
     * @description universal ID provided by database
     */
    public id: number;
    public type: PieceType;
    public position: Vector2;
    public readonly color: PlayerColor;
    public isDead: boolean;

    constructor(position: Vector2, type: PieceType, color: PlayerColor) {
        this.position = position;
        /**
         * @todo if server crash?
         */
        this.type = type;
        this.color = color;
        this.isDead = false;
    }

    public get isKing(): boolean {
        return this.type === PieceType.King;
    }

    public makeKing(): void {
        this.type = PieceType.King;
    }

    kill () {
        this.isDead = true;
        this.position.removeFromExistence();
    }

  //@ts-ignore
  getPossibleCaptureDirections(): Vector2[] {
    // I know, it's terrible, but sorry xD
    if (this.isKing)
      return [
        [-2, -2],
        [2, 2],
        [-2, 2],
        [2, 2],
      ].map(([x, y]) => new Vector2(x, y));

    if (this.color === PlayerColor.Yellow) {
      return [
        [-2, 2],
        [2, 2],
      ].map(([x, y]) => new Vector2(x, y));
    } else if (this.color === PlayerColor.Blue) {
      return [
        [-2, -2],
        [2, -2],
      ].map(([x, y]) => new Vector2(x, y));
    }
  }

    toJSON () {
        return {
            type: this.type,
            position: { x: this.position.x, y: this.position.y },
            color: this.color,
            id: this.id
        }
    }
}
