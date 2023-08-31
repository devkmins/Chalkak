import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../../atoms";
import { Link } from "react-router-dom";
import defaultUserProfileImg from "../../assets/User/default-profile.png";
import Menu from "../../components/Menu";
import { useState } from "react";

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
  a {
    display: flex;
    align-items: center;

    span {
      font-size: 26px;
      font-weight: 700;
      margin-top: 10px;
      margin-left: 12.5px;
    }
  }
`;

const SearchPostBox = styled.div`
  width: 62.5%;
  border-right: 1px solid #d1d1d1;
`;

const AuthBox = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 25px;
    margin-top: 2.5px;
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

const UserImgBox = styled.div`
  width: min-content;
  height: min-content;
`;

const DefaultUserImg = styled.div`
  background-image: url(${defaultUserProfileImg});
  background-position: center center;
  background-size: cover;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

function Header() {
  const loggedIn = useRecoilValue(loggedInState);

  const [userImgClick, setUserImgClick] = useState(false);

  const onClick = () => {
    setUserImgClick((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <LogoBox>
        <Link to={"/"}>
          <RiCameraLensFill size={40} />
          <span>Chalkak</span>
        </Link>
      </LogoBox>
      <SearchPostBox>
        <SearchPost />
      </SearchPostBox>
      <AuthBox>
        {loggedIn ? (
          <>
            <Link to={"/user/logout"}>Logout</Link>
            <Link to={"/post/upload"}>업로드</Link>
            <UserImgBox>
              <DefaultUserImg onClick={onClick} />
              {userImgClick && <Menu />}
            </UserImgBox>
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
