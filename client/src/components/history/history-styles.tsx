import styled from 'styled-components';
import { CenteredIcon, FadeAnimation } from '../../shared-styled-components';
import { devices } from '../../utils/devices';
import woodenFrame from '../../assets/common/modal/wooden-frame-with-bg.webp';
import paper from '../../assets/common/modal/paper.webp';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(7px);
  z-index: 5000;
`;

export const Container = styled.div`
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  height: 100%;
  background-image: url(${woodenFrame});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 33px 20px;
  animation-name: ${FadeAnimation};
  animation-duration: 1s;
  animation-iteration-count: 1;
  flex-grow: 1;
  overflow: hidden;
  @media ${devices.mobileWidth} {
    max-width: none;
  }
`;

export const Paper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-image: url(${paper});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 15px 20px;
  gap: 15px;
`;

export const Headers = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled(CenteredIcon)`
  width: 50px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export const HeadTitle = styled.div`
  color: #6a5f44;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

export const HeadSubTitle = styled.div`
  color: #6a5f44;
  text-align: center;
  font-size: 11px;
  font-weight: 300;
`;

export const HistoryWrapper = styled.div`
  overflow-y: scroll;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left bottom,
    left 90%,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 1))
  );
  padding-bottom: 45px;
  :nth-child(even) {
    background-color: #a99d8a;
  }
  :nth-child(odd) {
    background-color: #c9c0b0;
  }
`;
export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  color: #6a5f44;
  padding: 0 10px;
  height: 38px;
  width: 100%;
`;
