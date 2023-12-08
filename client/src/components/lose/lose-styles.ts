import styled, { keyframes } from 'styled-components';
import { CenteredIcon } from '../../shared-styled-components';
import { isMobile } from '../../utils/utils';
import { devices } from '../../utils/devices';
import leaveButton from "../../assets/common/leave-button.png";
import rematchButton from "../../assets/common/rematch-button.png";
import nextButton from "../../assets/common/next-button.png";
import winHighlight from "../../assets/common/lose-light.webp"

const FadeAnimation = keyframes`
  0% {opacity: 0%;}
  100% {opacity: 100%}
`;

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 2;
  backdrop-filter: blur(7px);
  background-color: rgba(0, 0, 0, 0.7);
  animation-name: ${FadeAnimation};
  animation-duration: 1s;
  animation-iteration-count: 1;
 
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  z-index: 3;
`;

export const LoseBGContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 945px;
  max-height: 550px;
  flex-shrink: 0;
  flex-grow: 1;
  @media ${devices.mobileWidth} {
    width: 80%;
    height: 40vh;
  }
`;

export const LoseBGImage = styled(CenteredIcon)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 3;
  
`;

export const LoseValueContainer = styled(CenteredIcon)`
  position: absolute;
  display: flex;
  width: 350px;
  justify-content: center;
  align-items: center;
  margin-top: 190px;
  font-size: 42px;
  color: #fef2dc;
  font-weight: 600;
  @media ${devices.mobileWidth} {
    width: 250px;
    font-size: 28px;
    margin-top: 90px;
  }
`;

export const BackgroundHighLight = styled.div`
  position: absolute;
  width: ${isMobile() ? '70vh' : '70vw'};
  height: ${isMobile() ? '70vh' : '70vw'};
  background-image: url(${winHighlight});
  background-repeat: no-repeat;
  background-size: 110% 110%;
  background-position: center;
  animation: ${SpinAnimation} 5s linear infinite;

  @media ${devices.mobileWidth} {
    width: ${isMobile() ? '100vh' : '100vw'};
    height: ${isMobile() ? '100vh' : '100vw'};
    margin-top: -145px;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: #ffe6b9;
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
  @media ${devices.mobileWidth} {
    font-size: 22px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  z-index: 5;
  @media ${devices.mobileWidth} {
    flex-direction: column-reverse;
  }
`;


export const LeaveButton = styled(Button)`
  border-image: url(${leaveButton}) 2 fill;
  border-image-width: 2px;
  height: 62px;
  width: 150px;
  @media ${devices.mobileWidth} {
    width: 150px;
    border-image-width: 0px;
  }
`;

export const PlayAgainButton = styled(Button)`
  border-image: url(${rematchButton}) 2 fill;
  border-image-width: 2px;
  height: 62px;
  width: 220px;
  @media ${devices.mobileWidth} {
    width: 150px;
    border-image-width: 0px;
  }
`;

export const NextGameButton = styled(Button)`
  border-image: url(${nextButton}) 2 fill;
  border-image-width: 2px;
  height: 62px;
  width: 220px;
  @media ${devices.mobileWidth} {
    border-image-width: 0px;
    width: 150px;
  }
`;

