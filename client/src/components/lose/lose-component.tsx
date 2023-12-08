import React from 'react';
import * as S from './lose-styles';
import { PlayerColor } from '../../game/player/playerColor';
import loseElement from '../../assets/common/lose-element.webp';
import loseValueWrapper from '../../assets/common/lose-value-wrapper.png';
import { useTranslation } from 'react-i18next';

export interface IWinner {
  color?: PlayerColor | null;
}

export function LoseComponent({ color = null }: IWinner) {
  const { t } = useTranslation();
  return (
    <S.Wrapper>
      <S.BackgroundHighLight />
      <S.Container>
        <S.ContentWrapper>
          <S.LoseBGContainer>
            <S.LoseBGImage icon={loseElement}>
              <S.LoseValueContainer icon={loseValueWrapper}>
                -R$123,00
              </S.LoseValueContainer>
            </S.LoseBGImage>
          </S.LoseBGContainer>
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
