// Libraries
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Package
import { styled } from "styled-components";

// Atoms
import { isBackToMainState } from "../atoms/navigationBackAtoms";
import { isLoggedOutState, loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";

// React
import { useRef, useState } from "react";

// Components
import SearchPost from "./SearchPost";
import LoggedInMenu from "./LoggedInMenu";
import GuestMenu from "./GuestMenu";

// Styles
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";

// React-Icons
import { RiCameraLensFill } from "@react-icons/all-files/ri/RiCameraLensFill";
import { FaBars } from "@react-icons/all-files/fa/FaBars";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Constants
import {
  JOIN_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  POST_UPLOAD_PATH,
} from "../constants/paths";
import { COOKIE_NAME } from "../constants/cookieName";

// Hook
import useClickOutside from "../hooks/useClickOutside";

// Styles
import {
  A_LITTILE_LIGHT_GRAY_COLOR,
  A_LITTLE_DARK_GRAY_COLOR,
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  NORMAL_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Api
import { userApi } from "../apis/user";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 65px;
  padding: 10px 15px;
  border-bottom: 0.5px solid ${A_LITTILE_LIGHT_GRAY_COLOR};
  background-color: ${WHITE_COLOR};
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
    font-weight: 550;
    margin-top: 2.5px;
    margin-left: 12.5px;
  }
`;

const SearchPostBox = styled.div<IIsMobile>`
  width: 100%;
  border-right: 1px solid ${LIGHT_GRAY_COLOR};
  padding-right: 35px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    border-right: none;
    padding-right: 10px;
    `}
`;

const AuthBox = styled.div``;

const LoggedInBox = styled.div<IIsMobile>`
  display: flex;
  align-items: center;
  margin-top: 2.5px;
  margin-left: ${(props) => (props.$isMobile === "true" ? "0px" : "15px")};

  span,
  a {
    cursor: pointer;
    padding: 7.5px 15px;
    color: ${NORMAL_GRAY_COLOR};
    white-space: nowrap;

    &:hover {
      color: ${BLACK_COLOR};
      transition: color 0.25s;
    }
  }
`;

const UserImgBox = styled.div<IIsMobile>`
  width: min-content;
  height: min-content;
  margin-right: ${(props) => (props.$isMobile === "true" ? "0px" : "10px")};
  margin-left: 10px;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const IsNotLoginBox = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 2.5px;
`;

const IsNotLoginLink = styled(Link)`
  white-space: nowrap;
  cursor: pointer;
  padding: 7.5px 20px;
  color: ${NORMAL_GRAY_COLOR};

  &:hover {
    color: ${BLACK_COLOR};
    transition: color 0.25s;
  }
`;

const GuestMenuBox = styled.div`
  width: min-content;
  height: min-content;
  margin-top: 2.5px;

  span,
  a {
    cursor: pointer;
    padding: 7.5px 20px;
    color: ${NORMAL_GRAY_COLOR};
    white-space: nowrap;

    &:hover {
      color: ${BLACK_COLOR};
      transition: color 0.25s;
    }
  }
`;

const StyledFaBars = styled(FaBars)`
  width: 22.5px;
  height: 22.5px;
  color: ${A_LITTLE_DARK_GRAY_COLOR};
  cursor: pointer;
`;

function Header() {
  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);
  const userProfileImg = sessionData.profileImage;

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies([COOKIE_NAME]);

  const setIsBackToMain = useSetRecoilState(isBackToMainState);

  const [userImgClicked, setUserImgClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const clickUserImgOutside = useClickOutside(menuRef, () =>
    setUserImgClicked(false)
  );

  const [guestMenuClicked, setGuestMenuClicked] = useState(false);
  const guestMenuRef = useRef<HTMLDivElement>(null);

  const clickGuestMenuOutside = useClickOutside(guestMenuRef, () =>
    setGuestMenuClicked(false)
  );

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);

  const isRoot = path === MAIN_PATH ? true : false;

  const onUserImgClick = () => {
    setUserImgClicked((prev) => !prev);
  };

  const handleUserImgFocus = () => {
    setUserImgClicked(true);
  };

  const onGuestMenuClick = () => {
    setGuestMenuClicked((prev) => !prev);
  };

  const handleGuestMenuFocus = () => {
    setGuestMenuClicked(true);
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
    navigate(MAIN_PATH);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const logout = async () => {
    await userApi.postUserLogout(cookies).then(() => {
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
    <HeaderContainer>
      <LogoBox onClick={logoClicked}>
        <RiCameraLensFill size={40} />
        {isDesktop && <span>Chalkak</span>}
      </LogoBox>
      <SearchPostBox $isMobile={isMobileString}>
        <SearchPost />
      </SearchPostBox>
      <AuthBox>
        {loggedIn ? (
          <>
            {(isTabletOrLaptop || isDesktop) && (
              <LoggedInBox $isMobile={isMobileString}>
                <span onClick={logout}>로그아웃</span>
                <Link to={POST_UPLOAD_PATH}>업로드</Link>
                <UserImgBox
                  onFocus={handleUserImgFocus}
                  ref={menuRef}
                  $isMobile={isMobileString}>
                  <UserImg
                    key={userProfileImg}
                    alt=""
                    src={
                      userProfileImg
                        ? `http://localhost:4000/${userProfileImg}`
                        : defaultUserProfileImg
                    }
                    onClick={onUserImgClick}
                  />
                  {userImgClicked && <LoggedInMenu />}
                </UserImgBox>
              </LoggedInBox>
            )}
            {isMobile && (
              <LoggedInBox $isMobile={isMobileString}>
                <UserImgBox
                  onFocus={handleUserImgFocus}
                  ref={menuRef}
                  $isMobile={isMobileString}>
                  <UserImg
                    key={userProfileImg}
                    alt=""
                    src={
                      userProfileImg
                        ? `http://localhost:4000/${userProfileImg}`
                        : defaultUserProfileImg
                    }
                    onClick={onUserImgClick}
                  />
                  {userImgClicked && <LoggedInMenu />}
                </UserImgBox>
              </LoggedInBox>
            )}
          </>
        ) : (
          <>
            {(isTabletOrLaptop || isDesktop) && (
              <IsNotLoginBox>
                <IsNotLoginLink to={LOGIN_PATH}>로그인</IsNotLoginLink>
                <IsNotLoginLink to={JOIN_PATH}>가입</IsNotLoginLink>
                <IsNotLoginLink to={LOGIN_PATH}>업로드</IsNotLoginLink>
              </IsNotLoginBox>
            )}
            {isMobile && (
              <GuestMenuBox>
                <StyledFaBars
                  onFocus={handleGuestMenuFocus}
                  onClick={onGuestMenuClick}
                />
                {guestMenuClicked && <GuestMenu />}
              </GuestMenuBox>
            )}
          </>
        )}
      </AuthBox>
    </HeaderContainer>
  );
}

export default Header;
