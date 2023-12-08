import React from 'react';
import * as S from './title-assets';
import titleLogo from '../../../assets/common/title-name.png';
import iconHistory from '../../../assets/common/icon-history.png';
import iconRules from '../../../assets/common/icon-rules.png';
import { useAppDispatch } from '../../../hooks/redux';
import { setDisplayHistory, setDisplayRules } from '../../../store/modal.store';

export function TitleComponent() {
  const dispatch = useAppDispatch();
  return (
    <S.Wrapper>
      <S.Logo icon={titleLogo} />
      <S.ButtonsList>
        <S.ButtonWrapper onClick={() => dispatch(setDisplayHistory(true))}>
          <S.Icon icon={iconHistory} />
          <S.ButtonText>Historico</S.ButtonText>
        </S.ButtonWrapper>
        <S.ButtonWrapper onClick={() => dispatch(setDisplayRules(true))}>
          <S.Icon icon={iconRules} />
          <S.ButtonText>Regras</S.ButtonText>
        </S.ButtonWrapper>
      </S.ButtonsList>
    </S.Wrapper>
  );
}
