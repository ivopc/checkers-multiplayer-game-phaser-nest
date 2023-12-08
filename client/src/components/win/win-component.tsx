import React from 'react';
import * as S from './win-styles';
import { PlayerColor } from '../../game/player/playerColor';
import winElement from '../../assets/common/win-element.png';
import winValueWrapper from '../../assets/common/win-value-wrapper.png';
import { useTranslation } from 'react-i18next';

export interface IWinner {
  color?: PlayerColor | null;
}

export function WinComponent({ color = null }: IWinner) {
  const { t } = useTranslation();
  return (
    <S.Wrapper>
      <S.BackgroundHighLight />
      <S.Container>
        <S.ContentWrapper>
          <S.WinBGContainer>
            <S.WinBGImage icon={winElement}>
              <S.WinValueContainer icon={winValueWrapper}>
                R$123,00
              </S.WinValueContainer>
            </S.WinBGImage>
          </S.WinBGContainer>
          <S.ButtonsWrapper>
            <S.LeaveButton onClick={() => null}>{t('Leave')}</S.LeaveButton>
            <S.PlayAgainButton onClick={() => null}>
              {t('Rematch')}
            </S.PlayAgainButton>
            <S.NextGameButton onClick={() => null}>
              {t('Next')}
            </S.NextGameButton>
          </S.ButtonsWrapper>
        </S.ContentWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
