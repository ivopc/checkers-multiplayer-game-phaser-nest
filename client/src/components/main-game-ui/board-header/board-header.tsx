import React, { useEffect, useState } from 'react';
import * as S from './board-header-styles';
import { InfoBox } from '../../info-box/info-box';
import { TimerBox } from '../../timer/timer';
import yellowPiece from '../../../assets/common/yellow-piece.png';
import bluePiece from '../../../assets/common/blue-piece.png';
import arrowLeft from '../../../assets/common/arrow-left.png';
import arrowRight from '../../../assets/common/arrow-right.png';
import { onTimerTick } from '../../../game/network/match.service';
import { waitGameNetworkConnection } from '../../../game/network';
import { EventManager } from '../../../game/network/Network';

const TIMER_MAX_SECONDS = 15;

export function BoardHeader() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timerTicker: EventManager;
    waitGameNetworkConnection().then(() => {
      timerTicker = onTimerTick((second) => {
        setTimer(TIMER_MAX_SECONDS - second);
      });
    });
    return () => timerTicker.removeListener();
  });

  return (
    <InfoBox>
      <S.GameHeaderContent>
        <S.HeaderPlayerInfo>
          <S.HeaderCheckerIcon icon={yellowPiece} />
          <S.PlayerName title="Jason Shaffer">Jason Shaffer</S.PlayerName>
        </S.HeaderPlayerInfo>
        <TimerBox>
          <S.TimerElements>
            <S.ArrowWrapperLeft>
              <S.TimerArrow icon={arrowLeft} />
            </S.ArrowWrapperLeft>
            <S.TimerWrapper>{timer}</S.TimerWrapper>
            <S.ArrowWrapperRight>
              <S.TimerArrow icon={arrowRight} />
            </S.ArrowWrapperRight>
          </S.TimerElements>
        </TimerBox>
        <S.HeaderPlayerInfo>
          <S.PlayerName title={'Jeremy Linder'}>Jeremy Linder</S.PlayerName>
          <S.HeaderCheckerIcon icon={bluePiece} />
        </S.HeaderPlayerInfo>
      </S.GameHeaderContent>
    </InfoBox>
  );
}
