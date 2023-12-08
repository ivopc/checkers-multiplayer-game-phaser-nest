import React, { useEffect, useRef, useState } from 'react';
import * as S from './main-game-styles.ts';
import { CheckersGame } from '../../game/index';
import './main-game-styles.ts';
import { WinComponent } from '../win/win-component';
import { useAppSelector } from '../../hooks/redux';
import ChatComponent from '../chat/chat.tsx';
import { GameComponent } from '../game/game.tsx';
import { TitleComponent } from './title/title.tsx';
import { LoseComponent } from '../lose/lose-component.tsx';
import { RulesComponent } from '../rules/rules.tsx';
import { HistoryComponent } from '../history/history.tsx';

/**
 * The Main Game UI component.
 * @returns {JSX.Element}
 */
export function MainGameUI() {
  const user = useAppSelector((state) => state.user);

  const gameRef = useRef<any>(null);
  const [showWin, setShowWin] = useState(false);

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Content>
          <S.TitleSection>
            <TitleComponent />
          </S.TitleSection>
          <S.GameSection>
            <GameComponent />
          </S.GameSection>
          {/* <S.ChatSection>
            <ChatComponent />
          </S.ChatSection> */}
        </S.Content>
      </S.ContentWrapper>
      {/* <WinComponent /> */}
      {/* <LoseComponent /> */}
      <RulesComponent />
      <HistoryComponent />
    </S.Wrapper>
  );
}
