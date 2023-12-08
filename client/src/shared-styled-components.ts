import styled, { keyframes } from "styled-components";
import infoBoxImage from "./assets/common/players-base.png";


export const TypographyRegular = "16px";

export const SharedHeader = styled.div`
    
  @media (max-width: 600px) {
    font-size: 32px;
    line-height: 32px;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 38px;
    line-height: 38px;
  }

  @media (min-width: 901px) {
    font-size: 48px;
    line-height: 48px;
  }
`;

export const SharedSubTitle = styled.div`
    
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 16px;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 20px;
    line-height: 20px;
  }

  @media (min-width: 901px) {
    font-size: 24px;
    line-height: 24px;
  }
`;

export const CenteredIcon = styled.div<{ icon?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(p) => p.icon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
`;

export const PlainInfoBox = styled.div`
  border-image: url(${infoBoxImage});
`;

export const HSpacer = styled.div<{ height: number }>`
  width: 100%;
  height: ${p => p.height}px;
`;

export const FadeAnimation = keyframes`
  0% {opacity: 0%;}
  100% {opacity: 100%}
`;