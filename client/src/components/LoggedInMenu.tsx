// Libraries
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Package
import styled from "styled-components";

// Atoms
import { sessionState } from "../atoms/sessionAtom";

// Styles
import { useMobile } from "../styles/mediaQueries";
import { WHITE_COLOR } from "../constants/colors";

// Constants
import { ACCOUNT_PATH, POST_UPLOAD_PATH, USER_PATH } from "../constants/paths";

// Hook
import useLogout from "../hooks/useLogout";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

const Container = styled.div<IIsMobile>`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 80px;
  background-color: ${WHITE_COLOR};
  border: 1px solid lightgray;
  border-bottom-left-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  border-top-left-radius: 12.5px;
  margin-top: 2.5px;
  right: 35px;

  a,
  span {
    font-size: 15px;
  }

  ${(props) =>
    props.$isMobile === "true" &&
    `
    grid-template-rows: repeat(4, 1fr);
    width: 125px;
    height: 180px;
    `}
`;

function LoggedInMenu() {
  const logout = useLogout();

  const sessionData = useRecoilValue(sessionState);

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const handleLogout = () => {
    logout();
  };

  return (
    <Container $isMobile={isMobileString}>
      {isMobile ? (
        <>
          <Link to={`${USER_PATH}/${sessionData.username}`}>프로필 보기</Link>
          <Link to={ACCOUNT_PATH}>계정 설정</Link>
          <Link to={POST_UPLOAD_PATH}>업로드</Link>
          <span onClick={handleLogout}>로그아웃</span>
        </>
      ) : (
        <>
          <Link to={`${USER_PATH}/${sessionData.username}`}>프로필 보기</Link>
          <Link to={ACCOUNT_PATH}>계정 설정</Link>
        </>
      )}
    </Container>
  );
}

export default LoggedInMenu;
