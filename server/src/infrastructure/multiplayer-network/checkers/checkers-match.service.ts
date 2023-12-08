import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';

import CheckersMatch from '@/multiplayer-game/checkers/entity/match.entity';
import Board from '@/multiplayer-game/checkers/entity/board.entity';
import CheckersPlayer, { PlayerColor } from '@/multiplayer-game/checkers/entity/player.entity';

import IMatchService from '../i-match.service';

import { GameplayManagerService } from '@/multiplayer-game/checkers/core/gameplay-manager.service';


const PLAYER_ONE = 0;
const PLAYER_TWO = 1;

interface MatchMakingStatus {
    someoneWaiting: boolean;
    match: CheckersMatch;
};

@Injectable()
export class CheckersMatchService implements IMatchService {

    matches: Map<string, CheckersMatch> = new Map();

    constructor (
        @Inject(forwardRef(() => GameplayManagerService))
        private readonly gameplayManagerService: GameplayManagerService,
    ) {
        //setInterval(() => console.log(this.matches), 2000);
    }

    async create (player: CheckersPlayer): Promise<CheckersMatch> {
        const networkRoomId = randomUUID();
        const match = new CheckersMatch(networkRoomId);
        const board = new Board();
        board.cells = board.createCells();
        match.board = board;
        match.players[PLAYER_ONE] = player;
        match.players[PLAYER_ONE].color = PlayerColor.Yellow;
        match.board.populateTeam(PlayerColor.Yellow);
        // you can use it to test some specifics game contexts to bug fixing (do not forget to comment `populateTeam` methods)
        /*match.board.createFromList([
            {
                "type": "King",
                "position": {
                    "x": 3,
                    "y": 3
                },
                "color": "Yellow",
                "id": 1700607701975
            },
            {
                "type": "Normal",
                "position": {
                    "x": 4,
                    "y": 4
                },
                "color": "Blue",
                "id": 1700607701975
            },
        ] as any);*/
        this.matches.set(networkRoomId, match);
        /*@todo-dbconst { id } = await this.checkerMatchRepository.create({
            networkRoomId,
            winnerId: "",
            bet: 0,
            net: 0,
            playerOne: player.name,
            playerTwo: "",
            finished: false
        });
        match.id = id;*/
        return match;
    }

    findWaitingMatch (): CheckersMatch | null {
        const match = [ ... this.matches].find(([ , match ]) => !match.players[PLAYER_TWO]);
        if (match) {
            return match[1];
        };
        return null;
    }

    async matchMaking (playerId: string): Promise<MatchMakingStatus> {
        const waitingMatch = this.findWaitingMatch();
        if (waitingMatch) {
            waitingMatch.players[PLAYER_TWO] =  new CheckersPlayer(playerId, "PlayerTwo");
            waitingMatch.players[PLAYER_TWO].color = PlayerColor.Blue;
            waitingMatch.board.populateTeam(PlayerColor.Blue);
            /*@todo-dbawait Promise.all([
                this.checkerMatchRepository.setPlayerTwo({
                    matchId: waitingMatch.id,
                    playerId
                }),
                this.checkersPieceRepository.createAll({
                    pieces: waitingMatch.board.getAllPieces().map(piece => ({
                        matchId: waitingMatch.id,
                        positionX: piece.position.x,
                        positionY: piece.position.y,
                        playerColor: piece.color as any,
                        type: CheckersPieceType.Normal,
                        isDead: false
                    }))
                })
            ]);*/
            return { someoneWaiting: true, match: waitingMatch };
        };
        const player = new CheckersPlayer(playerId, "PlayerOne");
        const match = await this.create(player);
        return { someoneWaiting: false, match };
    }

    dispatchEvents (matchId: string) {
        this.gameplayManagerService.initEvents(matchId);
    }

    async stalemate (matchId: number) {}

    async disconnected () {}

    async finish (matchId: number, matchNetworkRoomId: string, winner: string) {
        /*@todo-db
        await this.matchRepository.finish({
            matchId: match.id as number,
            winner: match.players.find(player => player.color === winnerColor)?.id as string
        })*/
        console.log("matches before", this.matches);
        this.matches.delete(matchNetworkRoomId);
        console.log(`Match ${matchNetworkRoomId} over, winner: ${winner}`, this.matches);
        
    }
}
