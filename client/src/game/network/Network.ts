import io, { Socket } from 'socket.io-client';

export default class Network {
  private socket: Socket;

  constructor(token: string) {
    this.socket = io(import.meta.env.VITE_MULTIPLAYER_WS_URL, {
      path: import.meta.env.VITE_MULTIPLAYER_WS_PATH,
      /**
       * @todo WHICH ONE WE WILL USE ?
       */
      auth: { token },
      query: { gameId: import.meta.env.VITE_GAME_ID },
    });
    console.log(this.socket);
    this.addNativeEvents();
  }

  send(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  addEvent(event: string, fn: Function, context?: any): Network {
    this.socket.on(event, context ? fn.bind(context) : fn);
    return this;
  }

  removeEvent(event: string) {
    this.socket.off(event);
  }

  removeEventListener(event: string, listener: (...args: any[]) => void) {
    this.socket.off(event, listener);
  }

  async request(event: string, data?: any): Promise<any> {
    const response = await new Promise((resolve) =>
      this.socket.emit(event, data, resolve),
    );
    return response;
  }

  async waitEvent(event: string): Promise<any> {
    return await new Promise((resolve) => this.socket.once(event, resolve));
  }

  managerOption(event: string, listener: (...args: any[]) => void) {
    return new EventManager(event, listener, this);
  }

  addNativeEvents() {
    this.socket.on('connect_error', (data) => console.log('exception', data));
  }
}

export class EventManager {
  event: string;
  listener: (...args: any[]) => void;
  network: Network;

  constructor(
    event: string,
    listener: (...args: any[]) => void,
    network: Network,
  ) {
    this.event = event;
    this.listener = listener;
    this.network = network;
  }

  removeListener() {
    this.network.removeEventListener(this.event, this.listener);
  }
}
