import { Module } from "@nestjs/common";

import { MultiplayerGameModule } from "@/multiplayer-game/multiplayer-game.module";

import { MatchGateway } from "./match.gateway";
import { MatchService } from "./match.service";
import { PlayerGateway } from "./player.gateway";
import { PlayerService } from "./player.service";
import { RoomService } from "./room.service";
import { CheckersGateway } from "./checkers/checkers.gateway";
import { CheckersMatchService } from "./checkers/checkers-match.service";
import { GameplayManagerService } from "@/multiplayer-game/checkers/core/gameplay-manager.service";
import { BoardService } from "@/multiplayer-game/checkers/core/board.service";
import { TimerService } from "@/multiplayer-game/timer.service";


@Module({
    imports: [
        MultiplayerGameModule,
    ],
    providers: [
        MatchGateway, MatchService,
        PlayerGateway, PlayerService,
        RoomService,
        TimerService,
        CheckersGateway, CheckersMatchService, GameplayManagerService, BoardService,
    ],
    exports: [CheckersMatchService, RoomService]
})
export class MultiplayerNetworkModule {};