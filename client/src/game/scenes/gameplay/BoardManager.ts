import GameplayScene from '.';

import BoardEvents from './BoardEvents';
import TurnManager from './TurnManager';
import { onTimerTick } from '../../network/match.service';
import { TurnResults } from '../../network/payloads';
import { GameNetworkEvents } from '../../network/events';

export default class BoardManager {
  scene: GameplayScene;
  event: BoardEvents;
  turn: TurnManager;

  constructor(scene: GameplayScene) {
    this.scene = scene;
    this.event = new BoardEvents(scene, this);
    this.turn = new TurnManager(scene, this);
  }

  async init() {
    onTimerTick(() => this.event.emit(GameNetworkEvents.TimerTick));
    await this.update();
  }

  async update() {
    let turnResults: TurnResults;
    if (this.turn.isPlayerTurn()) {
      turnResults = (await this.turn.executePlayerTurn()) as TurnResults;
    } else {
      turnResults = await this.turn.executeOpponentTurn();
    }
    if (turnResults.winner) {
      this.scene.curentTurnText.setText(
        `${turnResults.winner} are the winner of match!!!`,
      );
      this.scene.input.enabled = false;
      this.scene.backgroundMusic.stop();
      this.scene.sound.play(
        turnResults.winner === this.scene.player.color
          ? 'audio/soundtrack/VictoryMusic'
          : 'audio/soundtrack/LoseMusic',
      );
    } else {
      this.update();
    }
  }
}
