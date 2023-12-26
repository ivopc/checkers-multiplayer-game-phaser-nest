import Phaser from 'phaser';
//import { BoardGrid } from '../game-components/board/board-grid';
import { BOARDCONFIG, GameplaySceneKey } from '../../config/constants';
import { MatchBootData } from '../../network/payloads';

import MatchManager from './MatchManager';
import BoardManager from './BoardManager';

import Board from './entities/Board';
import Player, { PlayerColor } from './entities/Player';

export default class GameplayScene extends Phaser.Scene {
  //private boardGrid!: BoardGrid;
  match!: {
    manager: MatchManager;
    initData?: MatchBootData;
  };

  board!: {
    manager: BoardManager;
    entity?: Board;
  };

  backgroundMusic!:
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.NoAudioSound;

  player!: Player;
  remotePlayer!: Player;

  curentTurnText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: GameplaySceneKey });
    this.match = {
      manager: new MatchManager(this),
    };
    this.board = {
      manager: new BoardManager(this),
    };
  }

  init(data: MatchBootData) {
    this.match.initData = data;
  }

  preload(): void {
    this.load.image(
      PlayerColor.Blue,
      '/App/src/game/assets/sprites/blue-checker.png',
    );
    this.load.image(
      PlayerColor.Yellow,
      '/App/src/game/assets/sprites/yellow-checker.png',
    );
  }

  create() {
    this.backgroundMusic = this.sound.add('audio/soundtrack/BackgroundMusic', {
      loop: true,
      volume: 0.2,
    });
    this.backgroundMusic.play();
    const {
      board,
      player: { current, remote },
    } = this.match.manager.init(this.match.initData as MatchBootData);
    this.board.entity = board;
    this.player = current;
    this.remotePlayer = remote;
    this.board.manager.turn.setCurrentTurn(
      this.match.initData?.match.currentTurn as any,
    );
    this.curentTurnText = this.add
      .text(
        this.cameras.main.width / 2,
        650,
        this.match.initData?.match.currentTurn as string,
        {
          fontSize: 35,
        },
      )
      .setOrigin(0.5);
    this.curentTurnText.visible = false;
    this.board.manager.init();
    this.cameras.main.centerOn(
      board.x + board.width / 2,
      board.y + board.height / 2,
    );
  }
}
