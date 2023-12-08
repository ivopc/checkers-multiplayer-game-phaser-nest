import Vector2 from "./vector2.entity";
import Cell from "./cell.entity";
import Piece, { PieceType } from "./piece.entity";
import { PlayerColor } from "./player.entity";
import Move from "./move.entity";

import gameConfig from "../GameConfig";

export default class Board {
    public cells: Map<string, Cell>;
    public pieces: Piece[] = [];

    createCells (): Map<string, Cell> {
        const cells: Map<string, Cell> = new Map();
        for (let y = 0; y < gameConfig.boardSize; y++) {
            for (let x = 0; x < gameConfig.boardSize; x++) {
                const position = new Vector2(x, y);
                const cell = new Cell(position, null);
                cells.set(position.toString(), cell);
            };
        };
        return cells;
    }

    populateTeam (playerColor: PlayerColor) {
        const row = teamRow[playerColor];
        const boardWidth = gameConfig.boardSize; 
        const numRows = row.end - row.start + 1; // +1 to make endRow inclusive
        const piecesPerTeam = Math.floor(boardWidth / 2) * numRows;
        let piecesCount = 0;
        this.cells.forEach((cell, key) => {
            if (piecesCount >= piecesPerTeam) return;
            const { position } = cell;
            const x = position.x;
            const y = position.y;
            if (y >= row.start && y <= row.end) {
                if ((x + y) % 2 !== 0) {
                    const piece = new Piece(
                        new Vector2(x, y), 
                        PieceType.Normal, 
                        playerColor
                    );
                    piece.id = Date.now();
                    cell.setPiece(piece);
                    this.pieces.push(piece);
                    piecesCount++;
                }
            }
        });
        /*
        @todo refactor with this one
        const row = teamRow[playerColor];
        [...this.cells]
            .filter(([, cell]) => 
                cell.position.x >= row.start && 
                cell.position.y <= row.end && 
                (cell.position.x + cell.position.y) % 2 !== 0
            )
            .forEach(([, cell]) =>  {
                const piece = new Piece(
                    new Vector2(cell.position.x, cell.position.y), 
                    PieceType.Normal, 
                    team.color
                );
                cell.setPiece(piece);
                team.addPiece(piece);
            });*/
    }

    /**
     * @description This is useful for server crashes in case of in-session memory lost and automated tests
     */
    createFromList (pieces: Piece[]) {
        this.pieces = pieces.map(pieceData => {
            const piece = new Piece(
                new Vector2(pieceData.position.x ,pieceData.position.y), 
                pieceData.type, 
                pieceData.color
            );
            this.getCellFromPosition(piece.position).setPiece(piece);
            return piece;
        })
    }

    getAllCells (): Cell[] {
        return [ ... this.cells.values() ];
    }

    getAllPieces (): Piece[] {
        return this.getAllCells()
            .filter(cell => !cell.isEmpty())
            .map(cell => cell.getPiece()) as Piece[];
    }

    isValidPosition (position: Vector2): boolean {
        return (
            position.x >= 0 &&
            position.x < gameConfig.boardSize &&
            position.y >= 0 &&
            position.y < gameConfig.boardSize
        );
    }

    fetchPieceFromPosition (position: Vector2): Piece {
        return (this.cells.get(position.toString()) as Cell)?.getPiece?.() as Piece;
    }

    public getJumpedPieceFromMove(move: Move): Piece | null {
        const startPosition = move.from;
        const endPosition = move.to;
        const jumpX = (startPosition.x + endPosition.x) / 2;
        const jumpY = (startPosition.y + endPosition.y) / 2;
        return this.fetchPieceFromPosition(new Vector2(jumpX, jumpY));
    }

    getCellFromPosition (position: Vector2): Cell {
        const cell = this.cells.get(position.toString());
        if (!this.isValidPosition(position) || cell === undefined) {
            throw new Error(`Error finding board cell at position: ${position}.`);
        };
        return cell;
    }

    public isPieceMaxForwardPosition (piece: Piece): boolean {
        switch (piece.color) {
          case PlayerColor.Yellow: {
            return piece.position.y === gameConfig.boardMaxBottomPosition;
          };
          case PlayerColor.Blue: {
            return piece.position.y === gameConfig.boardMaxTopPosition;
          }
        }
    }

    getAllCapturedPieces(color?: PlayerColor): Piece[] {
        return this.pieces.filter(piece =>  piece.isDead && color ? piece.color === color : true);
      }

    toJSON () {
        return {
            pieces: this.getAllPieces().map(piece => piece.toJSON())
        }
    }
};

const teamRow = ({
    [PlayerColor.Yellow]: ({
        start: 0,
        end: 2
    }),
    [PlayerColor.Blue]: ({
        start: 5,
        end: 7
    })
});