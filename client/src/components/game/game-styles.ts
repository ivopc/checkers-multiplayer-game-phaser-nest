import styled from "styled-components";
import { devices } from "../../utils/devices";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 960px;
  gap: 35px;
  @media ${devices.mobileWidth} {
    gap: 20px;
  }
`;
