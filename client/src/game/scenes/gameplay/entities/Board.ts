import Phaser from 'phaser';
import Vector2 from '../../../utils/vector2';

import gameConfig from '../../../config/gameConfig';
import Piece from './Piece';
import Cell from './Cell';
import Move from './Move';
import Player, { PlayerColor } from './Player';
import GameplayScene from '..';

export const BoardLayout = {
  x: 215,
  y: 64,
  width: 700,
  height: 700,
};

export const CellLayout = {
  initialX: 16,
  initialY: 19,
  width: 83,
  height: 84,
};

export default class Board extends Phaser.GameObjects.Container {
  private cells!: Map<string, Cell>;
  public capturedPieces: Piece[] = [];
  base: Phaser.GameObjects.Sprite;
  entitiesContainer: Phaser.GameObjects.Container;
  constructor(scene: GameplayScene) {
    super(scene, BoardLayout.x, BoardLayout.y);
    this.setSize(BoardLayout.width, BoardLayout.height);
    this.base = scene.add.sprite(0, 0, 'board').setOrigin(0);
    this.base.setDisplaySize(BoardLayout.width, BoardLayout.height);
    this.entitiesContainer = scene.add.container();
    this.add(this.base);
    this.add(this.entitiesContainer);
    scene.add.existing(this);
  }

  public isValidPosition(position: Vector2): boolean {
    return (
      position.x >= 0 &&
      position.x < gameConfig.boardSize &&
      position.y >= 0 &&
      position.y < gameConfig.boardSize
    );
  }

  public getCellFromPosition(position: Vector2): Cell {
    const cell = this.cells.get(position.toString());
    if (!this.isValidPosition(position) || cell === undefined) {
      throw new Error(`Error finding board cell at position: ${position}.`);
    }
    return cell;
  }

  public getCellFromPiece(piece: Piece): Cell {
    const position = this.getPiecePosition(piece);
    return this.getCellFromPosition(position);
  }

  public getAllCells(): Cell[] {
    return Array.from(this.cells.values());
  }

  public getAllPieces(): Piece[] {
    return this.getAllCells()
      .filter((cell) => !cell.isEmpty())
      .map((cell) => cell.getPiece()) as Piece[];
  }

  public getPiecePosition(piece: Piece): Vector2 {
    for (const [position, cell] of this.cells) {
      if (!cell.isEmpty() && cell.getPiece() === piece) {
        return Vector2.toVector(position);
      }
    }
    throw new Error('Piece position not found.');
  }

  public getPiece(position: Vector2): Piece | null {
    if (this.isValidPosition(position)) {
      return this.getCellFromPosition(position).getPiece();
    }
    return null;
  }

  public getJumpedPieceFromMove(move: Move): Piece {
    const startPosition = move.from;
    const endPosition = move.to;
    const jumpX = (startPosition.x + endPosition.x) / 2;
    const jumpY = (startPosition.y + endPosition.y) / 2;
    return this.getPiece(new Vector2(jumpX, jumpY)) as Piece;
  }

  public movePiece(move: Move) {
    const fromCell = this.getCellFromPosition(move.from);
    const toCell = this.getCellFromPosition(move.to);
    const piece = fromCell.getPiece() as Piece;
    fromCell.removePiece();
    toCell.setPiece(piece);
  }

  public deactivateAllCells() {
    this.cells.forEach((cell) => {
      cell.deactivate();
    });
  }

  public activeAllCells() {
    this.cells.forEach((cell) => {
      cell.activate();
    });
  }

  public createCells(scene: GameplayScene) {
    const cells: Map<string, Cell> = new Map();
    for (let y = 0; y < gameConfig.boardSize; y++) {
      for (let x = 0; x < gameConfig.boardSize; x++) {
        const position = new Vector2(x, y);
        const cell = new Cell(scene, position);
        this.entitiesContainer.add(cell);
        cells.set(position.toString(), cell);
      }
    }
    Phaser.Actions.GridAlign(
      [...cells].map(([, cell]) => cell),
      {
        x: CellLayout.initialX,
        y: CellLayout.initialY,
        width: gameConfig.boardSize,
        height: gameConfig.boardSize,
        cellWidth: CellLayout.width,
        cellHeight: CellLayout.height,
      },
    );
    /*this.entitiesContainer.add(
      [...cells].map(([, cell]) => {
        return scene.add
          .renderTexture(cell.x, cell.y, cell.width, cell.height)
          .fill(new Phaser.Display.Color().random().color)
          .setAlpha(0.5);
      }),
    );*/
    this.cells = cells;
  }

  public createAllPieces(scene: GameplayScene, pieces: Piece[]) {
    pieces.forEach((pieceData) => {
      const piece = new Piece(
        scene,
        new Vector2(pieceData.position.x, pieceData.position.y),
        pieceData.color,
      );
      const cell = this.getCellFromPosition(piece.position);
      const { x, y } = cell.getCenter();
      piece.setPosition(x, y).setOrigin(0.5);
      this.entitiesContainer.add(piece);
      cell.setPiece(piece);
    });
  }

  private removeAllPieces() {
    this.cells.forEach((cell) => {
      if (!cell.isEmpty()) {
        cell.removePiece();
      }
    });
  }

  getAllCapturedPieces(color?: PlayerColor): Piece[] {
    if (color === undefined) return this.capturedPieces;
    return this.capturedPieces.filter((piece) => piece.color === color);
  }
}
