import styled from "styled-components";
import { devices } from "../../utils/devices";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  max-width: 1920px;
  overflow-y: auto;
  overflow-x: hidden;

`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  @media ${devices.mobileWidth} {
    padding: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 35px;
  width: 100%;
  height: 100%;
  @media ${devices.mobileWidth} {
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameSection = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  /* width: 100%; */
`;

export const ChatSection = styled.div`
  display: flex;
  max-width: 350px;
  height: 100%;
`;

export const ChatWrapper = styled.div`
  max-width: 350px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`;