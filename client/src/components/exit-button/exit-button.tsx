import React from 'react';
import styled from 'styled-components';

export const Button = styled.div`
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
  cursor: pointer;
`;

export function ExitButton({ onClick }) {
  return <Button onClick={() => onClick && onClick()}>&#10005;</Button>;
}
