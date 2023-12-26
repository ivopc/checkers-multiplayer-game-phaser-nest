import styled from "styled-components";
import boardBase from "../../../assets/common/board-base.png";
import { CenteredIcon } from "../../../shared-styled-components";
import board from "../../../assets/common/modal/wooden-frame-with-bg.webp";
import { devices } from "../../../utils/devices";

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 170px 1fr 170px;
  grid-template-rows: 100%;
  /* overflow: hidden; */
  padding: 20px 10px;
  width: 100%;
  /* height: auto; */
  max-height: 580px;
  gap: 5px;
  border-image: url(${boardBase}) 11 fill;
  border-image-width: 8px;
  /* box-shadow: 30px 40px 32px 0px rgba(0, 0, 0, 0.58); */
  border-radius: 30px;
  @media ${devices.mobileWidth} {
    grid-template-columns: 100%;
    grid-template-rows: 50px 1fr 50px;
    border-image: url(${boardBase}) 20 fill;
    border-image-width: 5px;
    max-height: none;
    height: auto;
    padding: 10px;
  }
`;

export const Container = styled.div`
  position: absolute;
`;

export const DefeatedPieces = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 170px;
  flex-shrink: 0;
  overflow: hidden;
  @media ${devices.mobileWidth} {
    flex-direction: row;
    max-width: none;
    width: 100%;
  }
`;
export const DefeatedScoreWrapper = styled.div`
  width: 100%;
  max-width: 170px;
  height: auto;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  
  @media ${devices.mobileWidth} {
    flex-direction: row;
    max-width: none;
    flex: 0 0 40px;
  }
`;

export const DefeatedScoreBlueWrapper = styled(DefeatedScoreWrapper)`
  flex-direction: column-reverse;
  @media ${devices.mobileWidth} {
    flex-direction: row-reverse;
    align-items: center;
  }
`

export const DefeatedScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 65px;
  font-size: 52px;
  font-weight: 600;
  border-radius: 15px;
  background-color: #382313;
  color: #ffffe7;
  flex-shrink: 0;
  @media ${devices.mobileWidth} {
    flex-direction: row;
    width: 50px;
    height: 35px;
    font-size: 28px;
    padding: 0 10px;
    border-radius: 8px;
  }
`;

export const EliminatedYellowPiecesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-end;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media ${devices.mobileWidth} {
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const EliminatedBluePiecesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  transform: rotate(-180deg);
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media ${devices.mobileWidth} {
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const EliminatedPiece = styled(CenteredIcon) <{ rotation: number }>`
  width: 75px;
  height: 75px;
  transform: rotate(${p => p.rotation});
  @media ${devices.mobileWidth} {
    width: 50px;
    height: 50px;
  }
`;

export const BoardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media ${devices.mobileWidth} {
   display: flex;
   justify-content: center;
   align-items: center;
  }
`;

export const BoardContainer = styled.div`
  top:0;
  left:0;
  z-index: 20;
  overflow: visible;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  width: 12000px;
  height: 12000px; 
  background: url(${board});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  box-shadow: 15px 20px 16px 0px rgba(0, 0, 0, 0.58);
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`;

export const GameWrapper = styled.div`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
