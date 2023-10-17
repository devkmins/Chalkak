// Package
import { styled } from "styled-components";

// React
import { useState } from "react";

// Components
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

// MediaQuery
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";

// Styles
import {
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  NORMAL_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Type
import { IMediaQueriresType } from "../types/mediaQueriesType";

interface IPostSettingsProp {
  postId: string;
}

interface IDetailsLi {
  $showDetails: string;
}

interface ISettingsLi {
  $showSettings: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  padding: 100px 75px;
`;

const Box = styled.div<IMediaQueriresType>`
  width: ${(props) =>
    props.$isMobile === "true"
      ? "100%"
      : props.$isTabletOrLaptop === "true"
      ? "75%"
      : props.$isDesktop === "true" && "55%"};
  height: min-content;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${WHITE_COLOR};
  padding-bottom: 30px;
`;

const UlBox = styled.div`
  border-bottom: 1.25px solid ${LIGHT_GRAY_COLOR};
  padding: 25px 20px;
`;

const Ul = styled.ul`
  display: flex;
  width: 20%;
`;

const DetailsLi = styled.li<IDetailsLi>`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.$showDetails === "true" ? "black" : NORMAL_GRAY_COLOR};
  white-space: nowrap;
  margin-right: 25px;

  &:hover {
    color: ${BLACK_COLOR};
  }
`;

const SettingsLi = styled.li<ISettingsLi>`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.$showSettings === "true" ? "black" : NORMAL_GRAY_COLOR};
  white-space: nowrap;

  &:hover {
    color: ${BLACK_COLOR};
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

function PostSettings({ postId }: IPostSettingsProp) {
  const [showDetails, setShowDetails] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const showDetailsString = String(showDetails);
  const showSettingsString = String(showSettings);

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

  const clickDetails = () => {
    setShowDetails(true);
    setShowSettings(false);
  };

  const clickSettings = () => {
    setShowSettings(true);
    setShowDetails(false);
  };

  return (
    <Container>
      <Box
        $isMobile={isMobileString}
        $isTabletOrLaptop={isTabletOrLaptopString}
        $isDesktop={isDesktopString}>
        <UlBox>
          <Ul>
            <DetailsLi onClick={clickDetails} $showDetails={showDetailsString}>
              세부 사항
            </DetailsLi>
            <SettingsLi
              onClick={clickSettings}
              $showSettings={showSettingsString}>
              설정
            </SettingsLi>
          </Ul>
        </UlBox>
        <ContentBox>
          {showDetails && <EditPost postId={postId} />}
          {showSettings && <DeletePost postId={postId} />}
        </ContentBox>
      </Box>
    </Container>
  );
}

export default PostSettings;
