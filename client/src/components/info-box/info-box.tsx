import React from 'react';
import styled from 'styled-components';
import walletBase from '../../assets/common/wallet-base.png';
import { devices } from '../../utils/devices';

const Wrapper = styled.div<{ height?: number }>`
  flex-shrink: 0;
  background-color: #874426;
  border-radius: 20px;
  padding: 5px;
  width: 100%;
  height: ${(p) => (p.height ? p.height : 78)}px;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.58);
  @media ${devices.mobileWidth} {
    height: 48px;
    border-radius: 10px;
    border-width: 1px;
  }
`;

const GoldenBorderedBox = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #a56f45, #58301f);
  border: 2px solid #fdf480;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  @media ${devices.mobileWidth} {
    border-radius: 10px;
    border-width: 1px;
  }
`;

export function InfoBox({ children, height = 0 }) {
  return (
    <Wrapper height={height}>
      <GoldenBorderedBox>{children}</GoldenBorderedBox>
    </Wrapper>
  );
}
