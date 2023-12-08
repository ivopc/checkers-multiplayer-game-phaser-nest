import React, { useEffect, useRef } from 'react';
import * as S from './history-styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ExitButton } from '../exit-button/exit-button';
import { setDisplayHistory } from '../../store/modal.store';
import logo from '../../assets/common/logo-dama-online.webp';
import { useTranslation } from 'react-i18next';

export function HistoryComponent() {
  const menuRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const displayHistory = useAppSelector((state) => state.modal.displayHistory);
  const historyData = Array(50)
    .fill(null)
    .map((_, i) => ({
      id: i,
      data: 'Match history',
    }));
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (displayHistory) {
        dispatch(setDisplayHistory(false));
      }
    }
  };
  // Closes the menu if clicked outside of the box.
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayHistory]);
  return (
    <>
      {displayHistory && (
        <S.Wrapper>
          <S.Container ref={menuRef}>
            <S.Paper>
              <S.Headers>
                <S.Logo icon={logo} />
                <S.TitleWrapper>
                  <S.HeadTitle>{t('HistoryTitle')}</S.HeadTitle>
                  <S.HeadSubTitle>{t('HistorySubTitle')}</S.HeadSubTitle>
                </S.TitleWrapper>
                <ExitButton
                  onClick={() => dispatch(setDisplayHistory(false))}
                ></ExitButton>
              </S.Headers>
              <S.HistoryWrapper>
                {historyData &&
                  historyData.length > 0 &&
                  historyData.map((history) => (
                    <S.HistoryItem key={history.id}>
                      {history.data}
                    </S.HistoryItem>
                  ))}
              </S.HistoryWrapper>
            </S.Paper>
          </S.Container>
        </S.Wrapper>
      )}
    </>
  );
}
