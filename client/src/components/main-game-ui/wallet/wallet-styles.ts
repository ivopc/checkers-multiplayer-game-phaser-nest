import styled from "styled-components";
import { CenteredIcon } from "../../../shared-styled-components";
import { devices } from "../../../utils/devices";

export const Wrapper = styled.div`
  flex-shrink: 0;
  height: 60px;
  width: 100%;
`;

export const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 0 25px;
  @media ${devices.mobileWidth} {
    gap: 7px;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  @media ${devices.mobileWidth} {
    gap: 5px;
  }
`;

export const WalletIcon = styled(CenteredIcon)`
  width: 35px;
  height: 25px;
  @media ${devices.mobileWidth} {
    width: 20px;
    height: 20px;
  }
`;
export const MoneyIcon = styled(CenteredIcon)`
  width: 35px;
  height: 35px;
  @media ${devices.mobileWidth} {
    width: 20px;
    height: 20px;
  }
`;

export const WinIcon = styled(CenteredIcon)`
  width: 35px;
  height: 35px;
  @media ${devices.mobileWidth} {
    width: 20px;
    height: 20px;
  }
`;

export const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  @media ${devices.mobileWidth} {
    font-size: 14px;
    font-weight: 500;
  }
`;