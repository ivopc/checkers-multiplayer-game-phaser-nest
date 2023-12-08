import React from 'react';
import * as S from './wallet-styles';
import walletIcon from '../../../assets/common/wallet.png';
import moneyIcon from '../../../assets/common/money.png';
import winIcon from '../../../assets/common/win.png';
import { InfoBox } from '../../info-box/info-box';

export function WalletInfo() {
  return (
    <S.Wrapper>
      <InfoBox height={60}>
        <S.ListWrapper>
          <S.ItemWrapper>
            <S.WalletIcon icon={walletIcon} />
            <S.Text>R$ 123,12</S.Text>
          </S.ItemWrapper>
          <S.ItemWrapper>
            <S.MoneyIcon icon={moneyIcon} />
            <S.Text>R$ 123,12</S.Text>
          </S.ItemWrapper>
          <S.ItemWrapper>
            <S.WinIcon icon={winIcon} />
            <S.Text>R$ 123,12</S.Text>
          </S.ItemWrapper>
        </S.ListWrapper>
      </InfoBox>
    </S.Wrapper>
  );
}
