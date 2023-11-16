import styled from "styled-components";
import { IIsMobile } from "../../types/mediaQueriesType";
import { LIGHT_GRAY_COLOR } from "../../constants/colors";

export const DefaultContainer = styled.div``;

export const DefaultBox = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

export const DefaultSection = styled.section<IIsMobile>`
  margin-right: 25px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    margin-left: 22.5px;
    margin-top: 40px;
    `}
`;

export const MainTitleBox = styled.div`
  padding-bottom: 25px;
  border-bottom: 1px solid ${LIGHT_GRAY_COLOR};
`;

export const MainTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
