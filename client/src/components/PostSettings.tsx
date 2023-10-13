import { styled } from "styled-components";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useState } from "react";

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

const Box = styled.div`
  width: 55%;
  height: min-content;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  padding-bottom: 30px;
`;

const UlBox = styled.div`
  border-bottom: 1.25px solid #c9c7c7;
  padding: 25px 20px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 20%;
`;

const DetailsLi = styled.li<IDetailsLi>`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$showDetails === "true" ? "black" : "#999595")};

  &:hover {
    color: black;
  }
`;

const SettingsLi = styled.li<ISettingsLi>`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$showSettings === "true" ? "black" : "#999595")};

  &:hover {
    color: black;
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
      <Box>
        <UlBox>
          <Ul>
            <DetailsLi
              onClick={clickDetails}
              $showDetails={String(showDetails)}>
              세부 사항
            </DetailsLi>
            <SettingsLi
              onClick={clickSettings}
              $showSettings={String(showSettings)}>
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
