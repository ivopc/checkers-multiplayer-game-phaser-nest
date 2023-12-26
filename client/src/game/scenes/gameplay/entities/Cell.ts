import Phaser from 'phaser';
import Vector2 from '../../../utils/vector2';
import Piece from './Piece';
import GameplayScene from '..';

import { BoardEvent } from '../BoardEvents';

import { CellLayout } from './Board';

export default class Cell extends Phaser.GameObjects.Rectangle {
  public override scene: GameplayScene;
  public readonly position: Vector2;
  private piece: Piece | null;

  constructor(scene: GameplayScene, position: Vector2, piece?: Piece) {
    super(scene, 0, 0, CellLayout.width, CellLayout.height);
    this.scene = scene;
    this.position = position;
    this.piece = piece || null;
    this.setInteractive();
    this.on('pointerdown', this.onClick, this)
      .on('pointerup', this.mouseOver, this)
      .on('pointerout', this.mouseOut, this);
  }

  public getPiece(): Piece | null {
    return this.piece;
  }

  public getPieceNotNull(): Piece {
    if (!this.piece) throw new Error('Cell is empty!');
    return this.piece;
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

  public activate(): void {
    this.setStrokeStyle(LINE_WIDTH, 0x000000, 1);
    this.setInteractive();
  }

  public deactivate() {
    this.setStrokeStyle();
    this.disableInteractive();
  }

  public select() {
    this.setStrokeStyle(LINE_WIDTH, 0xffff00, 1);
  }

  public deselect() {
    this.setStrokeStyle();
  }

  private onClick() {
    this.scene.sound.play('audio/button/WoodClick2');
    this.select();
    this.scene.board.manager.event.emit(BoardEvent.CellClicked, this);
  }

  private mouseOver() {}

  private mouseOut() {}
}

const LINE_WIDTH = 3;
 