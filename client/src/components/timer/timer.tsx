import React from 'react';
import styled from 'styled-components';
import walletBase from '../../assets/common/wallet-base.png';
import { devices } from '../../utils/devices';

const Wrapper = styled.div<{ height?: number }>`
  background-color: #834225;
  border-radius: 20px;
  padding: 3px;
  width: 100%;
  height: ${(p) => (p.height ? p.height : 96)}px;
  box-shadow: 0px 27px 32px 0px rgba(0, 0, 0, 0.58);
  width: 165px;
  height: 110px;
  @media ${devices.mobileWidth} {
    width: 110px;
    height: 65px;
    border-radius: 10px;
    border-width: 1px;
    padding: 2px;
  }
`;

const GoldenBorderedBox = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #54443b, #372619);
  border: 2px solid #fdf480;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 56px;
  @media ${devices.mobileWidth} {
    border-radius: 10px;
    border-width: 1px;
    font-size: 38px;
  }
`;

export function TimerBox({ children }) {
  return (
    <Wrapper>
      <GoldenBorderedBox>{children}</GoldenBorderedBox>
    </Wrapper>
  );
}
