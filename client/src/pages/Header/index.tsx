import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultUserProfileImg from "../../assets/User/default-profile.png";
import Menu from "../../components/Menu";
import { useEffect, useRef, useState } from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 0.5px solid #c8d6e5;
  background-color: white;
  z-index: 100;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }

  span {
    cursor: pointer;
    font-size: 26px;
    font-weight: 700;
    margin-top: 10px;
    margin-left: 12.5px;
  }
`;

const SearchPostBox = styled.div`
  width: 65%;
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

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

function Header() {
  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);
  const userProfileImg = sessionData.profileImage;

  const [userImgClick, setUserImgClick] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const isRoot = path === "/" ? true : false;

  const onClick = () => {
    setUserImgClick((prev) => !prev);
  };

  const handleFocus = () => {
    setUserImgClick(true);
  };

  const logoClicked = () => {
    if (isRoot) {
      scrollToTop();
    } else {
      navigateToRoot();
    }
  };

  const navigateToRoot = () => {
    navigate("/");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserImgClick(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuRef]);

  return (
    <HeaderContainer>
      <LogoBox onClick={logoClicked}>
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
            <Link to={"/post/upload"}>업로드</Link>
            <UserImgBox onFocus={handleFocus} ref={menuRef}>
              <UserImg
                key={userProfileImg}
                alt=""
                src={
                  userProfileImg
                    ? `http://localhost:4000/${userProfileImg}`
                    : defaultUserProfileImg
                }
                onClick={onClick}
              />
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
