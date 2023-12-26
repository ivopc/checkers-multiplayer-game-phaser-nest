import * as Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  private readonly buttonSprite: Phaser.GameObjects.Sprite;
  private readonly buttonText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    origin: number,
    scale: number,
    texture: string,
    text: string,
    onClick: () => void,
    style: Phaser.Types.GameObjects.Text.TextStyle = {},
  ) {
    super(scene, x, y);

    this.buttonSprite = scene.add.sprite(0, 0, texture);
    this.buttonSprite.setOrigin(origin);
    this.buttonSprite.setScale(scale);
    this.add(this.buttonSprite);

    this.buttonText = scene.add.text(0, 0, text, {
      ...{
        font: '35px Sans-Serif',
        color: '#FFFFFF',
        align: 'center',
      },
      ...style,
    });
    this.buttonText.setOrigin(0.5);
    this.add(this.buttonText);

    this.buttonSprite.setInteractive({ useHandCursor: true });
    this.buttonSprite.on('pointerdown', () => {
      scene.sound.play('audio/button/ButtonClick');
      onClick.apply(scene);
    });

    Phaser.Display.Align.In.Center(this.buttonText, this.buttonSprite);
    scene.add.existing(this);
  }

  setButtonTexture(texture: string) {
    this.buttonSprite.setTexture(texture);
  }

  setButtonText(text: string) {
    this.buttonText.setText(text);
  }

  setButtonTextStyle(style: Phaser.Types.GameObjects.Text.TextStyle) {
    this.buttonText.setStyle(style);
  }

  setEnabled(enabled: boolean) {
    this.buttonSprite.input.enabled = enabled;
    if (enabled) {
      this.buttonSprite.setAlpha(1);
    } else {
      this.buttonSprite.setAlpha(0.5);
    }
  }
}
