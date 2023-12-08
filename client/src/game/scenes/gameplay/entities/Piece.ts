import Phaser from 'phaser';
import { PlayerColor } from './Player';
import Vector2 from '../../../utils/vector2';
import GameplayScene from '..';

import { CellLayout } from './Board';

import { GameEvents } from '../../..';

export interface PiecePositionRequest {
  from: Vector2;
  to: Vector2;
}

export default class Piece extends Phaser.GameObjects.Sprite {
  public position: Vector2;
  public readonly color: PlayerColor;
  public isKing: boolean;
  scene: GameplayScene;

  constructor(
    scene: GameplayScene,
    position: Vector2,
    color: PlayerColor,
    isKing: boolean = false,
  ) {
    super(scene, 0, 0, color);
    this.position = position;
    this.color = color;
    this.isKing = isKing;
    this.scene = scene;
    this.setDisplaySize(CellLayout.width, CellLayout.height);
  }

  public async setKing(isKing: boolean) {
    this.isKing = isKing;
    this.scene.sound.add('audio/function/ReceivingCoins');
    await new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        alpha: 0,
        duration: SET_KING_TWEEN_ANIMATION_TIME,
        onComplete: resolve,
      }),
    );
    this.setTexture(this.color + '-king');
    await new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        alpha: 1,
        duration: SET_KING_TWEEN_ANIMATION_TIME,
        onComplete: resolve,
      }),
    );
  }

  async move(position: Vector2) {
    const target = this.scene.board.entity?.getCellFromPosition(position);
    this.position = position;
    this.parentContainer.bringToTop(this);
    this.scene.sound.play('audio/movements/Play1');
    await Promise.all([
      new Promise((resolve) =>
        this.scene.tweens.add({
          targets: this,
          x: target?.x,
          y: target?.y,
          duration: MOVEMENT_TWEEN_ANIMATION_TIME,
          onComplete: resolve,
        }),
      ),
      new Promise((resolve) =>
        this.scene.tweens.add({
          targets: this,
          scale: 0.3,
          duration: MOVEMENT_Z_AXIS_TWEEN_YOYO_ANIMATION_TIME,
          onComplete: resolve,
          yoyo: true,
        }),
      ),
    ]);
  }

  async destroy() {
    this.scene.game.events.emit(GameEvents.CapturePiece, this);
    this.scene.sound.play('audio/movements/CapturedPiece1');
    await new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        alpha: 0,
        duration: KILL_TWEEN_ANIMATION_TIME,
        onComplete: resolve,
      }),
    );

    super.destroy(...arguments);
  }

  //@ts-ignore
  getPossibleCaptureDirections(): Vector2[] {
    if (this.isKing)
      return [
        [-2, -2],
        [2, -2],
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
}

const MOVEMENT_TWEEN_ANIMATION_TIME = 500;
const MOVEMENT_Z_AXIS_TWEEN_YOYO_ANIMATION_TIME =
  MOVEMENT_TWEEN_ANIMATION_TIME / 2;
const KILL_TWEEN_ANIMATION_TIME = 800;
const SET_KING_TWEEN_ANIMATION_TIME = 800;
