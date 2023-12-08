import React, { useEffect, useRef } from 'react';
import * as S from './rules-styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ExitButton } from '../exit-button/exit-button';
import { setDisplayRules } from '../../store/modal.store';
import { useTranslation } from 'react-i18next';
import explicitImage from '../../assets/common/modal/explicit-rules.png';
import implicitImage from '../../assets/common/modal/implicit-rules.png';
import { HSpacer } from '../../shared-styled-components';

export function RulesComponent() {
  const menuRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const explicitRules = [
    'NoPiecesLeftRule',
    'IsNotKingRule',
    'LastOppositeRowRule',
    'CapturePieceRule',
    'DiagonalMoveRule',
    'EmptyCellMoveRule',
    'ForwardMoveRule',
    'InsideBoardMoveRule',
    'MaxnxDistanceMoveRule',
    'MinDistanceMoveRule',
  ];
  const implicitRules = [
    'ImplicitTurnShift',
    'KingMovementRule',
    'EndGameRule',
    'InitialStateRule',
    'KingPromotion',
  ];
  const displayRules = useAppSelector((state) => state.modal.displayRules);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (displayRules) {
        dispatch(setDisplayRules(false));
      }
    }
  };
  // Closes the menu if clicked outside of the box.
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayRules]);
  return (
    <>
      {displayRules ? (
        <S.Wrapper>
          <S.Container ref={menuRef}>
            <S.ExitButtonWrapper>
              <ExitButton
                onClick={() => dispatch(setDisplayRules(false))}
              ></ExitButton>
            </S.ExitButtonWrapper>
            <S.ScrollContainer>
              <S.TitleImageWrapper>
                <S.Piece1 />
                <S.Piece2 />
                <S.TitleImage icon={explicitImage} />
              </S.TitleImageWrapper>
              <S.RulesContainer>
                {explicitRules &&
                  explicitRules.length > 0 &&
                  explicitRules.map((rule, index) => (
                    <S.RuleWrapper key={index}>
                      <S.RuleFrame>{rule}</S.RuleFrame>
                      <S.ExplicitRuleDescription>
                        {t(rule)}
                      </S.ExplicitRuleDescription>
                    </S.RuleWrapper>
                  ))}
              </S.RulesContainer>
              <HSpacer height="35" />
              <S.TitleImageWrapper>
                <S.Piece3 />
                <S.Piece4 />
                <S.TitleImage icon={implicitImage} />
              </S.TitleImageWrapper>
              <S.ImplicitRulesContainer>
                {implicitRules &&
                  implicitRules.length > 0 &&
                  implicitRules.map((rule, index) => (
                    <S.ImplicitRuleName key={index}>
                      {t(rule)}
                    </S.ImplicitRuleName>
                  ))}
              </S.ImplicitRulesContainer>
            </S.ScrollContainer>
          </S.Container>
        </S.Wrapper>
      ) : (
        <></>
      )}
    </>
  );
}
