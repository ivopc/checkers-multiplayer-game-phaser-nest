import styled from "styled-components";
import { CenteredIcon, FadeAnimation } from "../../shared-styled-components";
import woodenFrame from "../../assets/common/modal/wooden-frame-with-bg.webp";
import paper from "../../assets/common/modal/paper.webp";
import ruleFrame from "../../assets/common/modal/rule-frame.png"
import piece1 from "../../assets/common/modal/piece-1.png"
import piece2 from "../../assets/common/modal/piece-2.png"
import piece3 from "../../assets/common/modal/piece-3.png"
import piece4 from "../../assets/common/modal/piece-4.png"
import { devices } from "../../utils/devices";



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
export const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  overflow-y: scroll;
  -webkit-mask-image: -webkit-gradient(linear, left bottom, left 90%, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 1)));
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
  padding: 30px 0 50px 0;
  animation-name: ${FadeAnimation};
  animation-duration: 1s;
  animation-iteration-count: 1;
  flex-grow: 1;
  @media ${devices.mobileWidth} {
    max-width: none;
  }
`;

export const ExitButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 25px;
  z-index: 5;
`;

export const TitleImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const TitleImage = styled(CenteredIcon)`
  height: 80px;
  width: 100%;
`;



export const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: auto;
  background-image: url(${paper});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 15px 20px;
  gap: 10px;
`;

export const RuleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RuleFrame = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${ruleFrame});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: #300a06;
  font-weight: 700;
  font-size: 18px;
  @media ${devices.mobileWidth} {
    font-size: 14px;
  }
`;

export const ExplicitRuleDescription = styled.li`
  color: #300a06;
  font-weight: 500;
  font-size: 12px;
  word-wrap: break-word;
`;

export const ImplicitRuleName = styled.li`
  color: #d3c8b2;
  font-weight: 500;
  font-size: 14px;
  word-wrap: break-word;
`;

export const ImplicitRulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 15px 20px;
`;


export const Piece1 = styled(CenteredIcon)`
  background-image: url(${piece1});
  background-position: top;
  width: 100px;
  margin-top: -25px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
`;
export const Piece2 = styled(CenteredIcon)`
  background-image: url(${piece2});
  background-position: bottom;
  width: 70px;
  height: 150px;
  position: absolute;
  right: 0;
  top: 0;
`;
export const Piece3 = styled(CenteredIcon)`
  background-image: url(${piece3});
  background-position: top;
  margin-bottom: -80px;
  width: 60px;
  height: 150px;
  position: absolute;
  left: 0;
`;
export const Piece4 = styled(CenteredIcon)`
  background-image: url(${piece4});
  background-position: bottom;
  margin-top: -50px;
  width: 70px;
  height: 150px;
  position: absolute;
  right: 0;
`;