import Phaser from 'phaser';
import { connect } from '../network';
import { store } from '../../store';

import button from '../assets/sprites/button.png';
import cell from '../assets/sprites/cell.png';
import piece from '../assets/sprites/piece.png';

import { MenuSceneKey, PreloadSceneKey } from '../config/constants';

import { PlayerColor } from './gameplay/entities/Player';

/**
 * @todo preload UI
 */

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: PreloadSceneKey });
  }

  preload() {
    this.load.image('button', button);
    this.load.image('cell', cell);
    this.load.image('piece', piece);
    this.load.image('board', '/App/src/assets/common/board-with-tiles.png');
    this.load.image(
      PlayerColor.Yellow,
      '/App/src/assets/common/piece-yellow.png',
    );
    this.load.image(
      `${PlayerColor.Yellow}-king`,
      '/App/src/assets/common/piece-yellow-king.png',
    );
    this.load.image(PlayerColor.Blue, '/App/src/assets/common/piece-blue.png');
    this.load.image(
      `${PlayerColor.Blue}-king`,
      '/App/src/assets/common/piece-blue-king.png',
    );
    this.load.image("bg-bg-bg", "/App/src/assets/common/modal/paper.webp");
    this.load.image("logo", "/App/src/assets/common/title-name.png");
    audios.forEach((audio) =>
      this.load.audio(
        `audio/${audio}`,
        ['mp3', 'ogg', 'wav'].map(
          (format) => `/App/src/assets/audio/${audio}.${format}`,
        ),
      ),
    );
    this.load.rexAwait(this.setupMultiplayer, this);
  }

  async setupMultiplayer(success: Function, error: Function) {
    try {
      await connect(store.getState().user.accessToken as any);
      success();
      console.log('connection done');
      //@todo this.eventManager.setupNetworkListener();
    } catch (err) {
      console.log(err);
      error();
    }
  }

  create() {
    this.scene.start(MenuSceneKey);
  }
}

const audios = [
  'button/Button',
  'button/ButtonClick',
  'button/StartGame',
  'button/WoodClick',
  'button/WoodClick2',
  'function/Point',
  'function/PointGiven',
  'function/ReceivingCoins',
  'movements/CapturedPiece1',
  'movements/CapturedPiece2',
  'movements/Play1',
  'movements/Play2',
  'soundtrack/BackgroundMusic',
  'soundtrack/LoseMusic',
  'soundtrack/VictoryMusic',
];
