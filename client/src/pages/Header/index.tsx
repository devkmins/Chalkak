import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 0.5px solid #c8d6e5;
  background-color: white;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 26px;
    font-weight: 700;
    margin-top: 10px;
    margin-left: 12.5px;
  }
`;

const SearchPostBox = styled.div`
  width: 62.5%;
  border-right: 1px solid #d1d1d1;
`;

const AuthBox = styled.div`
  margin-top: 5px;

  a {
    margin-right: 25px;
    padding: 7.5px 10px;
    border-radius: 5px;
    color: #656f79;

    &:last-child {
      margin-right: 20px;
    }

    &:hover {
      color: black;
      transition: color 0.25s;
    }
  }
`;

function Header() {
  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);

  return (
    <HeaderContainer>
      <LogoBox>
        <RiCameraLensFill size={40} />
        <span>Chalkak</span>
      </LogoBox>
      <SearchPostBox>
        <SearchPost />
      </SearchPostBox>
      <AuthBox>
        {loggedIn ? (
          <>
            <Link to={"/user/logout"}>Logout</Link>
            <Link
              to={`/user/${sessionData.username}`}
              state={sessionData.username}>
              My Profile
            </Link>
            <Link to={"/post/upload"}>업로드</Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>로그인</Link>
            <Link to={"/join"}>가입</Link>
            <Link to={"/login"}>업로드</Link>
          </>
        )}
      </AuthBox>
    </HeaderContainer>
  );
}

export default Header;
