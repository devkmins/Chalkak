// Libraries
import { useLocation, useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";

// Package
import { styled } from "styled-components";

// React
import { useEffect, useState } from "react";

// Atoms
import { isLoggedOutState, loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";

// Component
import NotificationBar from "../components/NotificationBar";

// Asset
import loginImg from "../assets/Images/login.webp";

// Styles
import { useMobile } from "../styles/mediaQueries";
import {
  BLACK_COLOR,
  ERROR_MESSAGE_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// React-Icons
import { RiCameraLensFill } from "@react-icons/all-files/ri/RiCameraLensFill";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import { BiHide } from "@react-icons/all-files/bi/BiHide";

// Constants
import { getJoinSuccessText } from "../constants/notificationMessages";
import { LOGIN_FAILURE_LIMIT_EXCEEDED_ERROR } from "../constants/errorMessages";
import { MAIN_PATH } from "../constants/paths";
import {
  IS_JOINED_SESSION_KEY,
  LOGIN_COUNT_LOCAL_KEY,
} from "../constants/storagesKeys";

// Utils
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import {
  getSessionStorageItem,
  removeSessionStorageItem,
} from "../utils/sessionStorage";

// Api
import { globalApi } from "../apis/global";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  passwordError: string;
  userError: string;
  loginCountError: string;
}

const Box = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const LoginImgContainer = styled.div``;

const LoginImg = styled.div`
  position: fixed;
  background-image: url(${loginImg});
  width: 50%;
  height: 100%;
  background-position: center center;
  background-size: cover;
`;

const LoginBox = styled.div`
  display: grid;
  grid-template-rows: 25% 75%;
  width: 100%;
`;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12.5px;

  span {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 500;
  }

  hr {
    margin-top: 30px;
    width: 75%;
  }
`;

const LoginLogoIcon = styled(RiCameraLensFill)`
  width: 80px;
  height: 80px;
`;

const LoginForm = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 25%);
  grid-template-columns: 75%;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    font-weight: 300;
    font-weight: 500;
  }

  input {
    border-radius: 5px;
    border: 1px solid gray;
    height: 37.5%;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.75px solid ${GRAY_COLOR};
    }
  }
`;

const LoginPasswordBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    font-weight: 300;
    font-weight: 500;
  }
`;

const LoginPasswordInputBox = styled.div`
  display: grid;
  grid-template-columns: 94% 6%;
  align-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  height: 36%;
  min-width: min-content;

  &:focus-within {
    border: 1.75px solid ${GRAY_COLOR};
  }

  input {
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 15px;
  }
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginBtn = styled.button`
  border-radius: 5px;
  border: 1px solid gray;
  background-color: ${BLACK_COLOR};
  color: ${WHITE_COLOR};
  height: 40%;
  font-weight: 500;
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.span`
  margin-top: 7.5px;
  font-size: 13px;
  color: ${ERROR_MESSAGE_COLOR};
`;

function Login() {
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<IError>();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const isJoined = getSessionStorageItem(IS_JOINED_SESSION_KEY);

  const loginCount = getLocalStorageItem(LOGIN_COUNT_LOCAL_KEY);

  let userName;

  if (location.state) {
    userName = location.state.name;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (JSON.parse(loginCount) < 10) {
      const hashedFormData = {
        ...formData,
        password: CryptoJS.SHA256(formData.password).toString(),
      };

      await globalApi
        .postLogin(hashedFormData)
        .then((response) => {
          setLoggedIn(true);
          setSessionData(response.data.user);
          setIsLoggedOut(false);
          removeLocalStorageItem(LOGIN_COUNT_LOCAL_KEY);
          navigate(MAIN_PATH);
        })
        .catch((error) => {
          setError(error.response.data);

          if (loginCount) {
            setLocalStorageItem(
              LOGIN_COUNT_LOCAL_KEY,
              JSON.stringify(loginCount + 1)
            );
          } else {
            setLocalStorageItem(LOGIN_COUNT_LOCAL_KEY, JSON.stringify(1));
          }
        });
    } else {
      setTimeout(() => {
        removeLocalStorageItem(LOGIN_COUNT_LOCAL_KEY);
      }, 300000);
      setError((prev: IError | undefined) => {
        return {
          passwordError: prev?.passwordError || "",
          userError: prev?.userError || "",
          loginCountError: LOGIN_FAILURE_LIMIT_EXCEEDED_ERROR,
        };
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setError({
      passwordError: "",
      userError: "",
      loginCountError: "",
    });
  };

  const passwordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (loginCount) {
      removeLocalStorageItem(LOGIN_COUNT_LOCAL_KEY);
    }
  }, []);

  useEffect(() => {
    if (getSessionStorageItem(IS_JOINED_SESSION_KEY)) {
      removeSessionStorageItem(IS_JOINED_SESSION_KEY);
    }
  }, []);

  return (
    <Box $isMobile={isMobileString}>
      {isJoined === "true" && (
        <NotificationBar text={getJoinSuccessText(userName)} />
      )}
      {!isMobile && (
        <LoginImgContainer>
          <LoginImg />
        </LoginImgContainer>
      )}
      <LoginBox>
        <LoginLogo>
          <Link to={MAIN_PATH}>
            <LoginLogoIcon />
          </Link>
          <span>로그인</span>
          <hr />
        </LoginLogo>
        <LoginForm onSubmit={handleSubmit}>
          <LoginInputBox>
            <span>사용자 이름 또는 이메일</span>
            <input
              name="username"
              type="text"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              required
            />
            {error && error.userError && (
              <ErrorMessage>{error.userError}</ErrorMessage>
            )}
          </LoginInputBox>
          <LoginPasswordBox>
            <span>비밀번호</span>
            <LoginPasswordInputBox>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
              />
              {showPassword ? (
                <BiHide onClick={passwordToggle} />
              ) : (
                <BiShow onClick={passwordToggle} />
              )}
            </LoginPasswordInputBox>
            {error && error.passwordError && (
              <ErrorMessage>{error.passwordError}</ErrorMessage>
            )}
          </LoginPasswordBox>
          <LoginBtnBox>
            <LoginBtn type="submit">로그인</LoginBtn>
            {error && error.loginCountError && (
              <ErrorMessage>{error.loginCountError}</ErrorMessage>
            )}
          </LoginBtnBox>
        </LoginForm>
      </LoginBox>
    </Box>
  );
}

export default Login;
