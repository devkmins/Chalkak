import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedOutState } from "../atoms/authAtoms";
import { loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useMobile } from "../styles/mediaQueries";
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
  const isMobile = useMobile();

  const navigate = useNavigate();

  const setLoggedIn = useSetRecoilState(loggedInState);
  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies(["connect.sid"]);

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
        removeCookie("connect.sid");
        setIsLoggedOut(true);
        navigate("/");
      });
  };

  return (
    <Container $isMobile={String(isMobile)}>
      {isMobile ? (
        <>
          <Link to={`/user/${sessionData.username}`}>프로필 보기</Link>
          <Link to={"/account"}>계정 설정</Link>
          <Link to={"/post/upload"}>업로드</Link>
          <span onClick={logout}>로그아웃</span>
        </>
      ) : (
        <>
          <Link to={`/user/${sessionData.username}`}>프로필 보기</Link>
          <Link to={"/account"}>계정 설정</Link>
        </>
      )}
    </Container>
  );
}

export default LoggedInMenu;
