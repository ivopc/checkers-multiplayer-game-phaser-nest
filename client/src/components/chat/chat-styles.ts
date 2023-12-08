import styled, { keyframes } from 'styled-components';
import { CenteredIcon, SharedSubTitle } from '../../shared-styled-components';
import { devices } from '../../utils/devices';

const FadeAnimation = keyframes`
  0% {opacity: 0%;}
  100% {opacity: 100%}
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  @media ${devices.mobileWidth} {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(3px);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 350px;
  flex-grow: 1;
  flex-shrink: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  animation-name: ${FadeAnimation};
  animation-duration: 1s;
  animation-iteration-count: 1;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 2001;
  @media ${devices.mobileWidth} {
    position: absolute;
    top: 0;
    left: 0;
    padding: 45px;
  }
`;


export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 10px;
  max-height: 90px;
  background-color: #b77e4e;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom: 1px solid #dcb587;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  color: white;
  width: 100%;
`;

export const ExitButton = styled(CenteredIcon)`
  width: 35px;
  height: 35px;
`;

export const ExitButtonTemp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 24px;
  color: #754934;
  font-weight: 800;
  background-color: #dcb587;
  border-radius: 50%;
  flex-shrink: 0;
  width: 35px;
  height: 35px;
`;

export const MessagesContainer = styled.div`
  -webkit-mask-image: -webkit-gradient(linear, left top, left 1%, from(rgba(86, 71, 52, 0.5)), to(rgba(86, 71, 52, 1)));
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: #6a3d2b;
  gap: 15px;
  padding:  15px 0 15px;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const MessageItemWrapper = styled.div<{ isOtherPlayer?: boolean }>`
  display: flex;
  justify-content: ${p => p.isOtherPlayer ? "flex-end" : "flex-start"};
  padding: 0 10px;
  width: 100%;
`;

export const MessageItem = styled.div<{ isOtherPlayer?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  padding: 10px;
  width: 85%;
  background-color: ${p => p.isOtherPlayer ? "#b77e4e" : "#ffe6b9"};
  border-radius: 10px;
  color: ${p => p.isOtherPlayer ? "#ffe6b9" : "#754934"};
`;

export const InputWrapper = styled.div`
  border-top: 1px solid #dcb587;
  background-color: #b77e4e;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 85px;
  gap: 10px;
  padding: 10px;
  height: 150px;
  width: 100%;
`;

export const Input = styled.textarea`
  background: transparent;
  border: none;
  appearance: unset;
  background-color: rgba(255,255,255, 1);
  border-radius: 10px;
  padding: 10px;
  height: 78px;
`;

export const SendButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  padding: 10px 20px;
  font-weight: 600;
  background-color: #00ae10;
  border-radius: 10px;
  height: 50px;
`;