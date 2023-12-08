import { Module } from '@nestjs/common';
import { CheckersModule } from './checkers/checkers.module';

@Module({
  imports: [CheckersModule],
  exports: [CheckersModule]
})
export class MultiplayerGameModule {}
