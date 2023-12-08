import Phaser from 'phaser';
import Network from './Network';

import { GameNetworkEvents } from './events';
import { NetworkBootData } from './payloads';

export let gameNetwork: Network;
let networkReadyListener: any = new Phaser.Events.EventEmitter();

export async function connect(token: string): Promise<NetworkBootData> {
  try {
    const network = new Network(token);
    const gameBootData = await network.waitEvent(GameNetworkEvents.GameBoot);
    gameNetwork = network;
    networkReadyListener.emit('ready');
    return gameBootData;
  } catch (err) {
    throw err;
  }
}

export async function waitGameNetworkConnection(): Promise<Network> {
  if (gameNetwork) return gameNetwork;
  await new Promise((resolve) => networkReadyListener.once('ready', resolve));
  networkReadyListener.shutdown();
  networkReadyListener = null;
  return gameNetwork;
}
