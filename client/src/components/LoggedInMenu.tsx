// Libraries
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import axios from "axios";

// Package
import styled from "styled-components";

// Atoms
import { isLoggedOutState, loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";

// Style
import { useMobile } from "../styles/mediaQueries";

// Constants
import {
  ACCOUNT_PATH,
  MAIN_PATH,
  POST_UPLOAD_PATH,
  USER_PATH,
} from "../constants/paths";
import { COOKIE_NAME } from "../constants/cookieName";

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
  background-color: white;
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
  const setLoggedIn = useSetRecoilState(loggedInState);
  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies([COOKIE_NAME]);

  const navigate = useNavigate();

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const logout = async () => {
    await axios
      .post("http://localhost:4000/user/logout", cookies, {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn(false);
        setSessionData({
          email: "",
          username: "",
          name: "",
          profileImage: "",
          socialOnly: false,
          _id: "",
        });
        removeCookie(COOKIE_NAME);
        setIsLoggedOut(true);
        navigate(MAIN_PATH);
      });
  };

  return (
    <Container $isMobile={isMobileString}>
      {isMobile ? (
        <>
          <Link to={`${USER_PATH}/${sessionData.username}`}>프로필 보기</Link>
          <Link to={ACCOUNT_PATH}>계정 설정</Link>
          <Link to={POST_UPLOAD_PATH}>업로드</Link>
          <span onClick={logout}>로그아웃</span>
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
