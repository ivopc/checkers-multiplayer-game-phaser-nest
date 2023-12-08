import { Injectable } from '@nestjs/common';
import Timer, { TimerEvents } from './timer.entity';

@Injectable()
export class TimerService {
  private timers: Map<string, Timer> = new Map();

  /**
   * @todo If player connection gets lost and it turn back to game we need to start count to `Timer.currentSecond`
   * @param matchId 
   * @param seconds 
   */
  startTimer(matchId: string, seconds: number): void {
    const timer = new Timer(matchId);
    timer.start(seconds);
    this.timers.set(matchId, timer);
  }

  interruptTimer(matchId: string): void {
    if (!this.timers.has(matchId)) return;
    const timer = this.timers.get(matchId) as Timer;
    timer.emit(TimerEvents.Interrupt, matchId);
    this.timers.delete(matchId);
  }

  destroyTimerEntity (matchId: string): void {
    if (!this.timers.has(matchId)) return;
    const timer = this.timers.get(matchId) as Timer;
    if (!timer.endedAt) {
      timer.forceDestroy();
    };
    this.timers.delete(matchId);
  }

  /**
   * @description Emited inside of `Timer.start` for each `for await` loop are done without interrupt event
   * @param matchId 
   * @param callback 
   */
  onTimerTick(matchId: string, callback: ({ matchId, second }) => void): void {
    (this.timers.get(matchId) as Timer).on(TimerEvents.Tick, callback);
  }

  /**
   * @description Emited inside of `Timer.end`, it only will be called if the timer ends without any player piece move interruption or
   * server internal crashes, if players losts connection it will not be called too
   * @param matchId 
   * @param callback 
   */
  onTimerOver(matchId: string, callback: (matchId: string) => void): void {
    (this.timers.get(matchId) as Timer).on(TimerEvents.End, callback);
  }

  /**
   * @description this only will be emited from `TimerService.interruptTimer` that is got called from `GameplayManagerService.executePieceMove`
   * if player move are legal or match got stalemate
   * @param matchId 
   * @param callback 
   */
  onTimerInterrupt (matchId: string, callback: (matchId: string) => void): void {
    (this.timers.get(matchId) as Timer).on(TimerEvents.Interrupt, callback);
  }
}