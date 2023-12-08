import { Module } from "@nestjs/common"
import { MultiplayerNetworkModule } from "./infrastructure/multiplayer-network/multiplayer-network.module";
import { MultiplayerGameModule } from './multiplayer-game/multiplayer-game.module';

@Module({
  imports: [
    MultiplayerGameModule,
    MultiplayerNetworkModule,
  ],
})
export class AppModule {}