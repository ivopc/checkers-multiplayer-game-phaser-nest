import Phaser from 'phaser';
import GameplayScene from '.';

import { ruleManager } from './rules/RuleManager';

import Cell from './entities/Cell';
import { PiecePositionRequest } from './entities/Piece';

import { GameNetworkEvents } from '../../network/events';

import { setTimer } from '../../../store/game.store';
import { useAppDispatch } from '../../../hooks/redux';

export enum BoardEvent {
  CellClicked = '0',
  RequestToMovePieceEmptyCell = '1',
}

import { waitTurnResults } from '../../network/gameplay.service';
import Move from './entities/Move';
import Vector2 from '../../utils/vector2';
import { TurnResults } from '../../network/payloads';
import Board from './entities/Board';
import BoardManager from './BoardManager';

export default class BoardEvents extends Phaser.Events.EventEmitter {
  scene: GameplayScene;
  manager: BoardManager;
  /**
   * @description The `Piece` that player wants to move
   */
  private selectedCellWithPieceToRequestMove: Cell | null = null;
  /**
   * @description all player valid moves calculated when player turn starts
   */
  private playerValidMoves: Move[] = [];

  constructor(scene: GameplayScene, manager: BoardManager) {
    super();
    this.scene = scene;
    this.manager = manager;
    this.setupEvents();
  }

  async waitPlayerMovementRequest(): Promise<PiecePositionRequest> {
    this.playerValidMoves = ruleManager.findValidMovesForTeam(
      this.scene.board.entity as any,
      this.scene.player.color,
      this.scene.board.manager.turn.isFirstMovementOfTurn,
    );
    this.playerValidMoves.forEach((move) => {
      const cell = this.scene.board.entity?.getCellFromPosition(
        move.from,
      ) as Cell;
      cell.activate();
    });
    const cell: Cell = await this.waitEvent(
      BoardEvent.RequestToMovePieceEmptyCell,
    );
    return {
      from: this.selectedCellWithPieceToRequestMove?.position as Vector2,
      to: cell.position,
    };
  }

  async waitOpponentTurn(): Promise<TurnResults> {
    return await waitTurnResults();
  }

  onCellClicked(cell: Cell) {
    this.scene.board.entity?.deactivateAllCells();
    if (cell.isEmpty() && this.selectedCellWithPieceToRequestMove !== null) {
      this.emit(BoardEvent.RequestToMovePieceEmptyCell, cell);
      return;
    }

    if (this.selectedCellWithPieceToRequestMove !== null) {
      this.selectedCellWithPieceToRequestMove.deactivate();
    }

    if (this.selectedCellWithPieceToRequestMove === cell) {
      this.selectedCellWithPieceToRequestMove.deactivate();
      this.selectedCellWithPieceToRequestMove.deselect();
      this.selectedCellWithPieceToRequestMove = null;
      this.playerValidMoves.forEach((move) => {
        const cell = this.scene.board.entity?.getCellFromPosition(
          move.from,
        ) as Cell;
        cell.activate();
      });
      return;
    }
    this.selectedCellWithPieceToRequestMove = cell;
    this.selectedCellWithPieceToRequestMove.activate();
    this.selectedCellWithPieceToRequestMove.select();
    let validMovesFromCell = this.playerValidMoves.filter(
      (move) => this.scene.board.entity?.getCellFromPiece(move.piece) === cell,
    );
    if (
      this.playerValidMoves.some((move) => move.isCaptureMove) &&
      !this.scene.board.manager.turn.isFirstMovementOfTurn
    ) {
      const piecesWithCaptureMove = [
        ...new Set(
          validMovesFromCell
            .filter((move) => move.isCaptureMove)
            .map((move) => move.piece),
        ),
      ];

      validMovesFromCell = piecesWithCaptureMove
        .map((piece) =>
          ruleManager.findValidMovesForPiece(
            this.scene.board.entity as Board,
            piece,
          ),
        )
        .flat(Infinity) as Move[];
    }

    validMovesFromCell.forEach((move) => {
      const cell = this.scene.board.entity?.getCellFromPosition(
        move.to,
      ) as Cell;
      cell.activate();
    });
  }

  async waitEvent(event: any): Promise<any> {
    return new Promise((resolve) => this.once(event, resolve));
  }

  setupEvents() {
    this.on(BoardEvent.CellClicked, this.onCellClicked, this);
    //this.on(GameNetworkEvents.TimerTick, () => {});
  }
}
