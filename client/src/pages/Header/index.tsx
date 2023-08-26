import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import { Link } from "react-router-dom";

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);

  return (
    <HeaderBox>
      <RiCameraLensFill size={40} />
      <SearchPost />
      {loggedIn ? (
        <>
          <Link to={"/user/logout"}>Logout</Link>
          <Link
            to={`/user/${sessionData.username}`}
            state={sessionData.username}>
            My Profile
          </Link>
          <Link to={"/post/upload"}>Upload</Link>
        </>
      ) : (
        <>
          <Link to={"/join"}>회원가입</Link>
          <Link to={"/login"}>로그인</Link>
        </>
      )}
    </HeaderBox>
  );
}

export default Header;
