import Piece from "./piece.entity";
import Vector2 from "./vector2.entity";

export default class Move {
    public readonly piece: Piece;
    public readonly from: Vector2;
    public readonly to: Vector2;
    public readonly deltaX: number;
    public readonly deltaY: number;

    constructor(piece: Piece, from: Vector2, to: Vector2) {
        this.piece = piece;
        this.from = from;
        this.to = to;
        this.deltaX = Math.abs(to.x - from.x);
        this.deltaY = Math.abs(to.y - from.y);
    }

    get isCaptureMove (): boolean {
        return this.deltaX === 2 && this.deltaY === 2;
      }
};