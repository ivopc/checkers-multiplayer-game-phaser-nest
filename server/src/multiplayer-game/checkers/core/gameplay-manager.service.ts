import { Injectable, forwardRef, Inject } from '@nestjs/common';

import { BoardService } from './board.service';
import { CheckersMatchService } from '@/infrastructure/multiplayer-network/checkers/checkers-match.service';
import { TimerService } from '@/multiplayer-game/timer.service';
import { RoomService } from '@/infrastructure/multiplayer-network/room.service';

import CheckersMatch from '../entity/match.entity';
import Move from '../entity/move.entity';
import Vector2 from '../entity/vector2.entity';
import Piece from '../entity/piece.entity';
import { PlayerColor } from '../entity/player.entity';
import gameConfig from '../GameConfig';

import { TurnResults } from '@/infrastructure/multiplayer-network/checkers/checkers.gateway';
import { PiecePositionRequest } from '@/infrastructure/multiplayer-network/checkers/checkers.gateway';
import { GameNetworkEvents, CheckersEvents } from '@/infrastructure/multiplayer-network/events.enum';

import ruleManager from './rule/RuleManager';


@Injectable()
export class GameplayManagerService {
    constructor (
        private readonly boardService: BoardService,
        private readonly matchService: CheckersMatchService,
        @Inject(forwardRef(() => RoomService))
        private readonly roomService: RoomService,
        private readonly timerService: TimerService
    ) {}

    async executePieceMove (position: PiecePositionRequest, match: CheckersMatch): Promise<TurnResults> {
        let { from, to } = position;
        from = new Vector2(from.x, from.y);
        to = new Vector2(to.x, to.y);
        const move = new Move(match.board.fetchPieceFromPosition(from), from, to);
        if (match.currentTurn !== move.piece.color) {
            throw new Error("That is not your turn!!!!!");
        };
        const isMoveValid = ruleManager.isMoveValid(move, match.board);
        if (!isMoveValid) {
            throw new Error("Move isn't valid, so maybe you are a cheater?? ");
        };
        const thereIsPossibleCaptureMoveFromPiece = ruleManager.thereIsPossibleCaptureMoveFromPiece(match.board, move.piece);
        if (match.isFirstMovementOfTurn && thereIsPossibleCaptureMoveFromPiece && !move.isCaptureMove) {
            throw new Error("If there is a possible capture movement in first movement of turn, only capture moves are accepted!!");
        };
        const isStalemate = ruleManager.isStalemate(match.board, move.piece);
        if (isStalemate) {
            this.timerService.interruptTimer(match.networkRoomId);
            await this.matchService.stalemate(match.id);
            throw new Error("No more possible moves, what we've to do now???");
        };
        this.timerService.interruptTimer(match.networkRoomId);
        await this.boardService.movePiece(move, match.board);
        const shouldMakeKing = ruleManager.shouldMakeKing(match.board, move.piece);
        if (shouldMakeKing) {
            await this.boardService.makeKing(move.piece, match.board);
        };
        if (move.isCaptureMove) {
            await this.boardService.capturePiece(match.board.getJumpedPieceFromMove(move) as Piece, match.board);
            if (thereIsPossibleCaptureMoveFromPiece) {
                match.isFirstMovementOfTurn = false;
            } {
                match.switchCurrentTurn();
            };
        } else {
            match.switchCurrentTurn();
        };
        const thereIsAWinner = ruleManager.getMatchWinner(match.board);
        if (thereIsAWinner) {
            await this.dispatchWinner(thereIsAWinner, match);
        };
        return {
            move: {
                from: {
                    x: move.from.x,
                    y: move.from.y
                } as Vector2,
                to: {
                    x: move.to.x,
                    y: move.to.y
                } as Vector2
            },
            nextTurn: match.currentTurn,
            captured: move.isCaptureMove,
            makeKing: shouldMakeKing,
            winner: thereIsAWinner
        };
    }

    async initEvents (matchId: string) {
        this.initTimer(matchId);
    }

    async destroyEvents (matchId: string) {
        this.timerService.destroyTimerEntity(matchId);
    }

    async initTimer (matchId: string) {
        this.timerService.startTimer(matchId, gameConfig.turnTimeLimitSeconds);
        this.timerService.onTimerTick(matchId, data => this.onTimerTick(data));
        //this.timerService.onTimerInterrupt(matchId, matchId => this.onTimerInterrupt(matchId));
        this.timerService.onTimerOver(matchId, matchId => this.onTimerOver(matchId));
    }

    onTimerTick ({ matchId, second }) {
        this.roomService.emitToRoom({
            roomId: matchId,
            event: GameNetworkEvents.TimerTick,
            data: second
        });
    }

    onTimerOver (matchId: string) {
        console.log(`Timer over on match [${matchId}]!!`);
        const match = this.matchService.matches.get(matchId) as CheckersMatch;
        if (!match) return;
        match.switchCurrentTurn();
        this.timerService.destroyTimerEntity(matchId);
        this.roomService.emitToRoom({
            roomId: matchId,
            event: CheckersEvents.TurnResults,
            data: { jumpTurnDueInactivity: true, nextTurn: match.currentTurn } as TurnResults
        });
        this.initTimer(matchId);
    }
    
    onTimerInterrupt (matchId: string) {
        console.log(`Timer interrupted by player input on match [${matchId}]!!`);
        this.timerService.destroyTimerEntity(matchId);
    }

    async dispatchWinner (winnerColor: PlayerColor, match: CheckersMatch) {
        this.timerService.destroyTimerEntity(match.networkRoomId);
        await this.matchService.finish(
            match.id,
            match.networkRoomId,
            match.players.find(player => player.color === winnerColor)?.id as string
        );
    }
}


// Se ele puder comer mais de uma peça o turno não deve ser encerrado e o jogador deve ter a liberdade de escolher qual o caminho ele quer escolher neste Multi Movimento.