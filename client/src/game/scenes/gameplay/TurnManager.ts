import GameplayScene from '.';
import BoardManager from './BoardManager';
import { PlayerColor } from './entities/Player';
import { BoardEvent } from './BoardEvents';

import Move from './entities/Move';
import Piece, { PiecePositionRequest } from './entities/Piece';
import Vector2 from '../../utils/vector2';
import Cell from './entities/Cell';

import {
  requestPieceMovement,
  waitTurnResults,
} from '../../network/gameplay.service';
import { TurnResults } from '../../network/payloads';

export default class TurnManager {
  scene: GameplayScene;
  manager: BoardManager;

  timerCount = 0;

  currentTurn!: PlayerColor;
  public isFirstMovementOfTurn: boolean = true;

  constructor(scene: GameplayScene, manager: BoardManager) {
    this.scene = scene;
    this.manager = manager;
  }

  async executePlayerTurn(): Promise<TurnResults | undefined> {
    this.scene.input.enabled = true; // @todo improve this
    this.scene.curentTurnText.setText(this.scene.player.color);
    //this.scene.board.entity?.activeAllCells();
    let playerInputOrInactivity: any = await Promise.race([
      this.manager.event.waitPlayerMovementRequest(),
      waitTurnResults(),
    ]);
    try {
      let turnResults: TurnResults;
      if ('jumpTurnDueInactivity' in playerInputOrInactivity) {
        turnResults = playerInputOrInactivity;
        this.manager.event.off(BoardEvent.RequestToMovePieceEmptyCell);
        this.scene.board.entity?.deactivateAllCells();
      } else {
        turnResults = await requestPieceMovement(
          playerInputOrInactivity as PiecePositionRequest,
        );
      }

      await this.dispatchTurnResults(turnResults);
      if (turnResults.nextTurn !== this.scene.player.color) {
        this.switch();
      } else {
        this.isFirstMovementOfTurn = false;
      }
      return turnResults;
    } catch (err) {
      console.log(err);
    }
  }

  async executeOpponentTurn(): Promise<TurnResults> {
    this.scene.input.enabled = false; // @todo improve this
    this.scene.curentTurnText.setText(this.scene.remotePlayer.color);
    const turnResults = await this.manager.event.waitOpponentTurn();
    await this.dispatchTurnResults(turnResults);
    if (turnResults.nextTurn === this.scene.player.color) {
      this.switch();
    }
    return turnResults;
  }

  async dispatchTurnResults(turnResults: TurnResults) {
    if (turnResults.jumpTurnDueInactivity) {
      if (this.isPlayerTurn())
        console.log('Seu turno pulou por inatividade!!!');
      else
        console.log(
          'O jogador adversário ficou inativo e o turno dele está sendo pulado, sua vez!!!',
        );
      return;
    }
    //@ts-ignore
    const from = new Vector2(turnResults.move.from.x, turnResults.move.from.y);
    //@ts-ignore
    const to = new Vector2(turnResults.move.to.x, turnResults.move.to.y);
    const piece = this.scene.board.entity?.getPiece(from) as Piece;
    const move = new Move(piece, from, to);
    this.scene.board.entity?.movePiece(move);
    await piece.move(to);
    if (turnResults.captured) {
      const piece = this.scene.board.entity?.getJumpedPieceFromMove(
        move,
      ) as Piece;
      this.scene.board.entity?.capturedPieces.push(piece);
      const cell = this.scene.board.entity?.getCellFromPiece(piece);
      await piece.destroy(); // @todo destroy animation
      (cell as Cell).removePiece();
    }
    if (turnResults.makeKing) {
      await piece.setKing(true);
    }
  }

  setCurrentTurn(playerColor: PlayerColor) {
    this.currentTurn = playerColor;
  }

  switch() {
    this.isFirstMovementOfTurn = true;
    this.currentTurn =
      this.currentTurn === PlayerColor.Blue
        ? PlayerColor.Yellow
        : PlayerColor.Blue;
  }

  isPlayerTurn(): boolean {
    return this.currentTurn === this.scene.player.color;
  }
}
