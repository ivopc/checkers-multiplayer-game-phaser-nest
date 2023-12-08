import React, { useEffect } from 'react';
import { MainGameUI } from './components/main-game-ui/main-game-ui';
import styled from 'styled-components';
import { devices } from './utils/devices';
import desktopBG from './assets/desktop/bg.webp';
import mobileBG from './assets/mobile/bg.webp';
import { store } from './store';
import { fetchUserData, setUserAccessToken } from './store/user.store';
import { useAppDispatch } from './hooks/redux';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: #112244;
  background-image: url(${desktopBG});
  background-size: cover;
  @media ${devices.mobileWidth} {
    background-image: url(${mobileBG});
  }
`;

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    dispatch(setUserAccessToken(token));
    const getUserData = async () => {
      await dispatch(fetchUserData());
    };
    getUserData();
  }, []);
  return (
    <Wrapper>
      <MainGameUI />
    </Wrapper>
  );
}
