import Vector2 from "./vector2.entity";
import Piece from "./piece.entity";

export default class Cell {
    public readonly position: Vector2;
    //private readonly eventManager: EventManager;
    private piece: Piece | null;

    constructor(position: Vector2, piece: Piece | null) {
        this.position = position;
        this.piece = piece || null;
    }

    public getPiece(): Piece | null {
        return this.piece;
    }

    public getPieceNotNull() : Piece {
        if (!this.piece) throw new Error("Cell is empty!");
        return this.piece
    }

    public setPiece(player: Piece): void {
        this.piece = player;
    }

    public removePiece(): void {
        this.piece = null;
    }

    public isEmpty(): boolean {
        return this.getPiece() === null;
    }
}
