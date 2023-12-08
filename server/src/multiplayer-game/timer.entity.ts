
import { randomUUID } from 'crypto';
const SECOND = 1000;

/**
 * @desctiption UUID to make sure that the `Promise.reject()` from `Timer.start` for await are done by our internal timer interruptor 
 * and not external exceptions
 */
const INTERRUPT_PROMISE_EVENT_UUID = randomUUID();
const PAUSE_PROMISE_EVENT_UUID = randomUUID();

export enum TimerEvents {
    Start = "0",
    Tick = "1",
    End = "2",
    Interrupt = "3"
}

import EventEmitter from "events";


export default class Timer extends EventEmitter {
    matchId: string;
    timer: NodeJS.Timeout;
    interruptTimer: (value: unknown) => void | null;
    currentSecond: number;
    startedAt: number;
    endedAt: number;

    constructor (matchId: string) {
        super();
        this.matchId = matchId;
    }

    async start (secondsLimit: number) {
        const seconds = [ ... Array(secondsLimit)].map((_, i) => i + 1);
        this.currentSecond = 0;
        this.startedAt = Date.now();
        for await (const second of seconds) {
            console.log(`Timer tick on match [${this.matchId}] in second ${second}`);
            try {
                await this.tick();
                this.off(TimerEvents.Interrupt, this.interrupt);
                this.currentSecond ++;
                this.emit(TimerEvents.Tick, { matchId: this.matchId, second: this.currentSecond });
            } catch (interrupt) {
                if (interrupt !== INTERRUPT_PROMISE_EVENT_UUID) {
                    throw interrupt;
                };
                /**@important exit the for await */
                return;
            };
        };
        this.end();
    }

    async tick () {
        return await new Promise(async (resolve, reject) => {
            this.once(TimerEvents.Interrupt, this.interrupt);
            this.interruptTimer = reject;
            await this.sleep();
            resolve(true);
        });
    }

    async sleep () {
        return new Promise(resolve => this.timer = setTimeout(resolve, SECOND));
    }

    interrupt () {
        clearTimeout(this.timer);
        this.interruptTimer?.(INTERRUPT_PROMISE_EVENT_UUID);
        /*** @important clear reject callback to avoid memory leak */
        // @ts-ignore
        this.interruptTimer = null;
        this.endedAt = Date.now();
        this.removeAllListeners();
    }

    pause () {}

    end () {
        this.endedAt = Date.now();
        this.emit(TimerEvents.End, this.matchId);
        this.removeAllListeners();
    }

    forceDestroy () {
        this.interrupt();
    }
};