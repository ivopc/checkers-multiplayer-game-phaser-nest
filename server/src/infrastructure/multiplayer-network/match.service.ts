import { Injectable } from '@nestjs/common';
import { CheckersMatchService } from './checkers/checkers-match.service';

import { GameType } from '@/multiplayer-game/game-type.enum';


@Injectable()
export class MatchService {

    constructor (
        private readonly checkersMatchService: CheckersMatchService
    ) {}

    async matchMaking (gameType: GameType, playerId: string) {
        switch (gameType) {
            case GameType.Checkers: {
                return this.checkersMatchService.matchMaking(playerId);
            };
        };
    }

    dispatchEvents (gameType: GameType, matchId: string) {
        switch (gameType) {
            case GameType.Checkers: {
                this.checkersMatchService.dispatchEvents(matchId);
            };
        };
    }
};
