import Phaser from 'phaser';
import AwaitLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitloader-plugin';

import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import GameplayScene from './scenes/gameplay';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  scene: [PreloadScene, MenuScene, GameplayScene],
  backgroundColor: '#000000',
  parent: 'checkers-game',
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    // Game must be 1:1
    max: {
      width: 800,
      height: 800,
    },
  },
  // physics: {
  //     default: 'arcade',
  //     arcade: {
  //         gravity: { y: 300 },
  //         debug: false,
  //     },
  // },
  input: {
    gamepad: false,
  },
  audio: {
    disableWebAudio: false,
  },
  render: {
    pixelArt: false,
    antialias: false,
  },
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  plugins: {
    global: [
      {
        key: 'rexAwaitLoader',
        plugin: AwaitLoaderPlugin,
        start: true,
      },
    ],
  },
};

/**
 * Checkers Game class.
 */
export class CheckersGame {
  game: Phaser.Game;
  constructor() {
    this.game = new Phaser.Game(config);
    (globalThis as any).gameInstance = import.meta.env.DEV && this.game;
  }

  destroy() {
    this.game.destroy(true);
  }
}

export enum GameEvents {
  CapturePiece = '1',
}
