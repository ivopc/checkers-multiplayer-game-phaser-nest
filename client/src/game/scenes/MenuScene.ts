import Phaser from 'phaser';
import { MenuSceneKey, GameplaySceneKey } from '../config/constants';
import Button from '../utils/buttons/button';
import { matchMaking } from '../network/match.service';

export default class MenuScene extends Phaser.Scene {
  playButton!: Button;
  optionsButton!: Button;

  constructor() {
    super({ key: MenuSceneKey });
  }

  create() {
    /**
     * @todo put all of these inside a UI handler and layout data inside a json
     */
    this.add.image(this.cameras.main.centerX, 100, "bg-bg-bg").setOrigin(0.5).setDisplaySize(700, 1300);
    /*const titleText = this.add.text(
      this.cameras.main.centerX,
      100,
      'Checkers',
      {
        font: '64px Arial',
        color: '#000000',
      },
    );
    titleText.setOrigin(0.5);*/
    this.add.image(this.cameras.main.centerX, 200, "logo").setOrigin(0.5).setScale(1.5);
    this.playButton = new Button(
      this,
      500,
      400,
      0.5,
      0.25,
      'button',
      'Play',
      this.onPlayButtonClicked,
    );

    this.optionsButton = new Button(
      this,
      500,
      510,
      0.5,
      0.25,
      'button',
      'Options',
      this.onOptionsClicked,
    );
  }

  async onPlayButtonClicked() {
    this.playButton.setEnabled(false);
    const data = await matchMaking();
    this.scene.start(GameplaySceneKey, data);
  }

  onOptionsClicked() {
    console.log('Options button clicked.');
  }
}
