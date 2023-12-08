import React from 'react';
import * as S from './game-styles';
import { WalletInfo } from '../main-game-ui/wallet/wallet';
import { BoardHeader } from '../main-game-ui/board-header/board-header';
import { BoardGameplay } from '../main-game-ui/board-gameplay/board-gameplay';

export function GameComponent() {
  return (
    <S.Wrapper>
      <BoardHeader />
      <BoardGameplay />
      <WalletInfo />
    </S.Wrapper>
  );
}
