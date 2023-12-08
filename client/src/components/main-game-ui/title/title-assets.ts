import styled from "styled-components";
import { CenteredIcon } from "../../../shared-styled-components";
import { devices } from "../../../utils/devices";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  width: 100%;
  height: 100%;
  max-width: 350px;
  @media ${devices.mobileWidth} {
    max-width: unset;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Logo = styled(CenteredIcon)`
  width: 247px;
  height: 163px;
  @media ${devices.mobileWidth} {
    width: 100px;
    height: 80px;
  }
`;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 25px;
  @media ${devices.mobileWidth} {
    gap: 10px;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  @media ${devices.mobileWidth} {
   justify-content: flex-end;
  }
`;


export const ButtonText = styled.div`
  color: #fcf9f4;
  font-size: 18px;
  @media ${devices.mobileWidth} {
    font-size: 16px;
  }
`;

export const Icon = styled(CenteredIcon)`
  width: 64px;
  height: 64px;
  @media ${devices.mobileWidth} {
    width: 38px;
    height: 38px;
  }
`;