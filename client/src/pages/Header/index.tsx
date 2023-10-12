import { styled } from "styled-components";
import SearchPost from "../../components/SearchPost";
import { RiCameraLensFill } from "@react-icons/all-files/ri/RiCameraLensFill";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isBackToMainState,
  isLoggedOutState,
  loggedInState,
  sessionState,
} from "../../atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultUserProfileImg from "../../assets/User/default-profile.webp";
import LoggedInMenu from "../../components/LoggedInMenu";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../../styles/mediaQueries";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import GuestMenu from "../../components/GuestMenu";

interface IIsMobile {
  $isMobile: string;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 65px;
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

const SearchPostBox = styled.div<IIsMobile>`
  width: 100%;
  border-right: ${(props) =>
    props.$isMobile === "true" ? "none" : "1px solid #d1d1d1"};
  padding-right: ${(props) => (props.$isMobile === "true" ? "10px" : "35px")};
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
    color: #656f79;
    white-space: nowrap;

    &:hover {
      color: black;
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
  color: #656f79;

  &:hover {
    color: black;
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
    color: #656f79;
    white-space: nowrap;

    &:hover {
      color: black;
      transition: color 0.25s;
    }
  }
`;

const StyledFaBars = styled(FaBars)`
  width: 22.5px;
  height: 22.5px;
  color: #6b6666;
  cursor: pointer;
`;

function Header() {
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);
  const userProfileImg = sessionData.profileImage;

  const setIsBackToMain = useSetRecoilState(isBackToMainState);

  const [userImgClicked, setUserImgClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [guestMenuClicked, setGuestMenuClicked] = useState(false);
  const guestMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies(["connect.sid"]);

  const isRoot = path === "/" ? true : false;

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
        setUserImgClicked(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        guestMenuRef.current &&
        !guestMenuRef.current.contains(event.target)
      ) {
        setGuestMenuClicked(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [guestMenuRef]);

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
            {(isTabletOrLaptop || isDesktop) && (
              <LoggedInBox $isMobile={String(isMobile)}>
                <span onClick={logout}>로그아웃</span>
                <Link to={"/post/upload"}>업로드</Link>
                <UserImgBox
                  onFocus={handleUserImgFocus}
                  ref={menuRef}
                  $isMobile={String(isMobile)}>
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
              <LoggedInBox $isMobile={String(isMobile)}>
                <UserImgBox
                  onFocus={handleUserImgFocus}
                  ref={menuRef}
                  $isMobile={String(isMobile)}>
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
                <IsNotLoginLink to={"/login"}>로그인</IsNotLoginLink>
                <IsNotLoginLink to={"/join"}>가입</IsNotLoginLink>
                <IsNotLoginLink to={"/login"}>업로드</IsNotLoginLink>
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
