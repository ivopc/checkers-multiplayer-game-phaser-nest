import styled from "styled-components";
import { CenteredIcon } from "../../../shared-styled-components";
import { devices } from "../../../utils/devices";

export const GameHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 82px;
  padding: 0px 25px;
  width: 100%;
  @media ${devices.mobileWidth} {
   gap: 15px;
   height: 48px;
   padding: 0px 10px;
  }
`;

export const HeaderPlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  overflow: hidden;
  @media ${devices.mobileWidth} {
   gap: 10px;
  }
`;

export const HeaderCheckerIcon = styled(CenteredIcon)`
  width: 55px;
  height: 55px;
  @media ${devices.mobileWidth} {
    width: 32px;
    height: 32px;
  }
`;

export const PlayerName = styled.div`
  font-size: 26px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffe6b9;
  @media ${devices.mobileWidth} {
    font-size: 14px;
  }
`;


export const TimerElements = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
`;
export const ArrowWrapperLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: -16px;
  @media ${devices.mobileWidth} {
    margin-left: -12px;
  }
  
`;
export const ArrowWrapperRight = styled.div`
   position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: -16px;
    @media ${devices.mobileWidth} {
      margin-right: -12px;
    }
`;
export const TimerArrow = styled(CenteredIcon)`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  @media ${devices.mobileWidth} {
    width: 18px;
    height: 18px;
  }
`;