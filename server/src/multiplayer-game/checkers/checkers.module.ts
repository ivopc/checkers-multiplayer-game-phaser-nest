import { Module, forwardRef } from '@nestjs/common';

import { GameplayManagerService } from './core/gameplay-manager.service';
import { BoardService } from './core/board.service';
import { MultiplayerNetworkModule } from '@/infrastructure/multiplayer-network/multiplayer-network.module';
import { TimerService } from '../timer.service';


@Module({
    imports: [forwardRef(() => MultiplayerNetworkModule)],
    providers: [
        GameplayManagerService, BoardService,
        TimerService,
    ],

    exports: [GameplayManagerService]
})
export class CheckersModule {}
