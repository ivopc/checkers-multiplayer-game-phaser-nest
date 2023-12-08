import { gameNetwork } from '.';
import { CheckersEvents } from './events';
import { PiecePositionRequest } from '../scenes/gameplay/entities/Piece';
import { TurnResults } from './payloads';

export async function requestPieceMovement(
  position: PiecePositionRequest,
): Promise<TurnResults> {
  /* @cheating
  position.to.x = Number(prompt('try to cheat X'));
  position.to.y = Number(prompt('try to cheat Y'));*/
  try {
    gameNetwork.send(CheckersEvents.RequestPieceMovement, position);
    const results = await gameNetwork.waitEvent(CheckersEvents.TurnResults);
    return results;
  } catch (err) {
    throw err;
  }
}

export async function waitTurnResults(): Promise<TurnResults> {
  return await gameNetwork.waitEvent(CheckersEvents.TurnResults);
}

export function onTurnResults(callback: (turnResults: TurnResults) => void) {
  gameNetwork.addEvent(CheckersEvents.TurnResults, callback);
  return gameNetwork.managerOption(CheckersEvents.TurnResults, callback);
}
