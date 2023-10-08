import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isBackToMainState,
  isLoggedOutState,
  loggedInState,
  sessionState,
} from "../../atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultUserProfileImg from "../../assets/User/default-profile.webp";
import Menu from "../../components/Menu";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  useDesktop,
  useMobile,
  useSmallDevice,
  useTabletOrLaptop,
} from "../../styles/mediaQueries";
import { FaBars } from "react-icons/fa";

interface ISearchPostBoxProp {
  $isMobile: string;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 10px 15px;
  border-bottom: 0.5px solid #c8d6e5;
  background-color: white;
  z-index: 100;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;

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

const SearchPostBox = styled.div<ISearchPostBoxProp>`
  width: 100%;
  border-right: ${(props) =>
    props.$isMobile === "true" ? "none" : "1px solid #d1d1d1"};
  padding-right: ${(props) => (props.$isMobile === "true" ? "20px" : "35px")};
`;

const AuthBox = styled.div`
  display: flex;
  align-items: center;
`;

const IsNotLoginLinkBox = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 2.5px;
`;

const IsNotLoginLink = styled(Link)`
  white-space: nowrap;
  cursor: pointer;
  padding: 7.5px 20px;
  color: #656f79;

  &:hover {
    color: black;
    transition: color 0.25s;
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

const StyledFaBars = styled(FaBars)`
  width: 20px;
  height: 20px;
  color: #6b6666;
  cursor: pointer;
`;

function Header() {
  const isSmallDevice = useSmallDevice();
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);
  const userProfileImg = sessionData.profileImage;

  const setIsBackToMain = useSetRecoilState(isBackToMainState);

  const [userImgClick, setUserImgClick] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies(["connect.sid"]);

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
    setIsBackToMain(false);
    navigate("/");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
        {isDesktop && <span>Chalkak</span>}
      </LogoBox>
      <SearchPostBox $isMobile={String(isMobile)}>
        <SearchPost />
      </SearchPostBox>
      <AuthBox>
        {loggedIn ? (
          <>
            <span onClick={logout}>로그아웃</span>
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
            {(isTabletOrLaptop || isDesktop) && (
              <IsNotLoginLinkBox>
                <IsNotLoginLink to={"/login"}>로그인</IsNotLoginLink>
                <IsNotLoginLink to={"/join"}>가입</IsNotLoginLink>
                <IsNotLoginLink to={"/login"}>업로드</IsNotLoginLink>
              </IsNotLoginLinkBox>
            )}
            {isMobile && <StyledFaBars />}
          </>
        )}
      </AuthBox>
    </HeaderContainer>
  );
}

export default Header;
