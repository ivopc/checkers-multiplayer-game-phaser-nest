import Phaser from 'phaser';
import GameplayScene from '.';

import { MatchBootData } from '../../network/payloads';

import Board from './entities/Board';
import Player, { PlayerColor } from './entities/Player';

export default class MatchManager extends Phaser.Events.EventEmitter {
  scene: GameplayScene;

  constructor(scene: GameplayScene) {
    super();
    this.scene = scene;
  }

  init(initData: MatchBootData): {
    player: { current: Player; remote: Player };
    board: Board;
  } {
    const currentPlayerColor = initData.someoneWaiting
      ? PlayerColor.Blue
      : PlayerColor.Yellow;
    const currentPlayerData = initData.match.players[
      getPlayerIndexOrder(currentPlayerColor)
    ] as Player;

    const remotePlayerData = initData.match.players[
      getRemotePlayerIndexOrder(currentPlayerColor)
    ] as Player;

    const currentPlayer = new Player(
      currentPlayerData.name,
      currentPlayerData.color,
      getPlayerIndexOrder(currentPlayerColor),
    );
    const remotePlayer = new Player(
      remotePlayerData.name,
      remotePlayerData.color,
      getRemotePlayerIndexOrder(currentPlayerColor),
    );

    const board = new Board(this.scene);
    board.createCells(this.scene);
    board.createAllPieces(this.scene, initData.match.board.pieces);
    return {
      player: {
        current: currentPlayer,
        remote: remotePlayer,
      },
      board,
    };
  }

  reconnect() {}
}

function getPlayerIndexOrder(playerColor: PlayerColor): number {
  return playerColor === PlayerColor.Yellow ? PLAYER_ONE : PLAYER_TWO;
}

function getRemotePlayerIndexOrder(currentPlayerColor: PlayerColor): number {
  return currentPlayerColor === PlayerColor.Yellow ? PLAYER_TWO : PLAYER_ONE;
}

/**
 * these are the player array index coming from the server
 */
const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
