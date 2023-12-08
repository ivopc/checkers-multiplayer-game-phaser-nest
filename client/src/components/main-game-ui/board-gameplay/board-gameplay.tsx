import React, { useEffect, useRef, useState } from 'react';
import * as S from './board-gameplay-styles';
import bluePiece from '../../../assets/common/blue-piece.png';
import defeatedBluePiece from '../../../assets/common/defeated-blue-piece.png';
import yellowPiece from '../../../assets/common/yellow-piece.png';
import { CheckersGame } from '../../../game';
import { isMobile } from '../../../utils/utils';

import { GameEvents } from '../../../game';
import Piece from '../../../game/scenes/gameplay/entities/Piece';

export function BoardGameplay() {
  const bluePieces = Array(12).fill(0);

  const [capturedYellowPieces, setCapturedYellowPieces] = useState([]);
  const [capturedBluePieces, setCapturedBluePieces] = useState([]);

  const gameRef = useRef<any>(null);

  // Called on component creation.
  useEffect(() => {
    if (!gameRef.current) {
      const game = new CheckersGame();
      gameRef.current = game;
      game.game.events.on(GameEvents.CapturePiece, (piece: Piece) => {
        console.log('piece captured!!', piece);
        // [...] setCapturedBluePieces
        // [...] setCapturedYellowPieces
      });
    }
    // Destroy the game when the component is removed from the UI.
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
        gameRef.current = null;
      }
    };
  }, []);
  return (
    <S.Wrapper>
      {/* These are the pieces the yellow team have eliminated */}
      <S.DefeatedPieces>
        <S.DefeatedScoreWrapper>
          <S.DefeatedScore>12</S.DefeatedScore>
          <S.EliminatedYellowPiecesList>
            {bluePieces &&
              bluePieces.length > 0 &&
              bluePieces.map((_, i) => (
                <S.EliminatedPiece key={i} icon={defeatedBluePiece} />
              ))}
          </S.EliminatedYellowPiecesList>
        </S.DefeatedScoreWrapper>
      </S.DefeatedPieces>
      <S.BoardWrapper>
        <S.BoardContainer>
          <S.GameWrapper id="checkers-game"></S.GameWrapper>
        </S.BoardContainer>
      </S.BoardWrapper>
      {/* These are the pieces the Blue team have eliminated */}
      <S.DefeatedScoreBlueWrapper>
        <S.DefeatedScore>12</S.DefeatedScore>
        <S.EliminatedBluePiecesList>
          {bluePieces &&
            bluePieces.length > 0 &&
            bluePieces.map((_, i) => (
              <S.EliminatedPiece
                key={i}
                rotation={isMobile() ? '180deg' : '-90deg'}
                icon={yellowPiece}
              />
            ))}
        </S.EliminatedBluePiecesList>
      </S.DefeatedScoreBlueWrapper>
    </S.Wrapper>
  );
}
