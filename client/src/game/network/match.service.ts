import { gameNetwork } from '.';
import { GameNetworkEvents } from './events';
import { MatchBootData } from './payloads';

export async function matchMaking(): Promise<MatchBootData> {
  gameNetwork.send(GameNetworkEvents.MatchMaking);
  const { someoneWaiting, match } = await gameNetwork.waitEvent(
    GameNetworkEvents.MatchBoot,
  );
  if (someoneWaiting) {
    console.log('já tinha alguém esperando a partida!!');
    return { someoneWaiting, match };
  } else {
    console.log('Esperando alguém entrar na sua partida!!');
    const { match } = await gameNetwork.waitEvent(GameNetworkEvents.MatchBoot);
    console.log('Acabaram de entrar!!');
    return { someoneWaiting, match };
  }
}

export async function reconnectMatch() {}

export function onTimerTick(callback: (second: number) => void) {
  gameNetwork.addEvent(GameNetworkEvents.TimerTick, callback);
  return gameNetwork.managerOption(GameNetworkEvents.TimerTick, callback);
}
