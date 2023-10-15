// Libraries
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";

// Package
import styled from "styled-components";

// React
import { useEffect, useState } from "react";

// Asset
import joinImg from "../assets/Images/join.webp";

// Style
import { useMobile } from "../styles/mediaQueries";

// React-Icons
import { RiCameraLensFill } from "@react-icons/all-files/ri/RiCameraLensFill";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import { BiHide } from "@react-icons/all-files/bi/BiHide";

// Constants
import {
  EMAIL_VALIDITY_ERROR,
  NAME_LENGTH_ERROR,
  USERNAME_LENGTH_ERROR,
  NAME_WHITE_SPACE_ERROR,
  PASSWORD_COMPLEXITY_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_WHITE_SPACE_ERROR,
  USERNAME_WHITE_SPACE_ERROR,
} from "../constants/errorMessages";
import { LOGIN_PATH, MAIN_PATH } from "../constants/paths";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  nameError: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

const Box = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  min-height: 100vh;
`;

const JoinImgContainer = styled.div``;

const JoinImg = styled.div`
  position: fixed;
  background-image: url(${joinImg});
  width: 50%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  max-height: 100vh;
  overflow: hidden;
`;

const JoinBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 25% 75%;
  height: 150vh;
  overflow: scroll;
`;

const JoinLogo = styled.div`
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

const JoinLogoIcon = styled(RiCameraLensFill)`
  width: 80px;
  height: 80px;
`;

const JoinForm = styled.form`
  display: grid;
  grid-template-rows: repeat(6, 17.5%);
  grid-template-columns: 75%;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

const JoinInputBox = styled.div`
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
    height: 36%;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.75px solid #636e72;
    }
  }
`;

const JoinPasswordBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    font-weight: 300;
    font-weight: 500;
  }
`;

const JoinPasswordInputBox = styled.div`
  display: grid;
  grid-template-columns: 94% 6%;
  align-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  height: 36%;
  min-width: min-content;

  &:focus-within {
    border: 1.75px solid #636e72;
  }

  input {
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 15px;
  }
`;

const JoinBtn = styled.button`
  border-radius: 5px;
  border: 1px solid gray;
  background-color: black;
  color: white;
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
  color: #ff6b6b;
`;

function Join() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<IError>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimName = formData.name.trim();
    const trimUsername = formData.username.trim();
    const trimPassword = formData.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(formData.email);

    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).*(?=.*[0-9]).*$/;
    const isValidPassword = passwordRegex.test(formData.password);

    if (formData.name.length < 2 || formData.name.length > 20) {
      setError((prevError: IError | undefined) => ({
        usernameError: prevError?.usernameError || "",
        emailError: prevError?.emailError || "",
        passwordError: prevError?.passwordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        nameError: NAME_LENGTH_ERROR,
      }));

      return;
    }

    if (formData.name !== trimName) {
      setError((prevError: IError | undefined) => ({
        usernameError: prevError?.usernameError || "",
        emailError: prevError?.emailError || "",
        passwordError: prevError?.passwordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        nameError: NAME_WHITE_SPACE_ERROR,
      }));

      return;
    }

    if (formData.username.length < 3 || formData.username.length > 20) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        emailError: prevError?.emailError || "",
        passwordError: prevError?.passwordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        usernameError: USERNAME_LENGTH_ERROR,
      }));

      return;
    }

    if (formData.username !== trimUsername || formData.username.includes(" ")) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        emailError: prevError?.emailError || "",
        passwordError: prevError?.passwordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        usernameError: USERNAME_WHITE_SPACE_ERROR,
      }));

      return;
    }

    if (!isValidEmail) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        usernameError: prevError?.usernameError || "",
        passwordError: prevError?.passwordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        emailError: EMAIL_VALIDITY_ERROR,
      }));

      return;
    }

    if (formData.password !== trimPassword || formData.password.includes(" ")) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        usernameError: prevError?.usernameError || "",
        emailError: prevError?.emailError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        passwordError: PASSWORD_WHITE_SPACE_ERROR,
      }));

      return;
    }

    if (formData.password.length < 8 || formData.password.length > 16) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        usernameError: prevError?.usernameError || "",
        emailError: prevError?.emailError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        passwordError: PASSWORD_LENGTH_ERROR,
      }));

      return;
    }

    if (!isValidPassword) {
      setError((prevError: IError | undefined) => ({
        nameError: prevError?.nameError || "",
        usernameError: prevError?.usernameError || "",
        emailError: prevError?.emailError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        passwordError: PASSWORD_COMPLEXITY_ERROR,
      }));

      return;
    }

    const hashedJoinFormData = {
      ...formData,
      password: CryptoJS.SHA256(formData.password).toString(),
      confirmPassword: CryptoJS.SHA256(formData.confirmPassword).toString(),
    };

    const join = await axios
      .post("http://localhost:4000/join", hashedJoinFormData, {
        withCredentials: true,
      })
      .then(() => {
        sessionStorage.setItem("isJoined", "true");
        navigate(LOGIN_PATH, { state: { name: formData.name } });
      })
      .catch((error) => setError(error.response.data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setError({
      nameError: "",
      emailError: "",
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
    });
  };

  const passwordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const confirmPasswordToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box $isMobile={isMobileString}>
      {!isMobile && (
        <JoinImgContainer>
          <JoinImg />
        </JoinImgContainer>
      )}
      <JoinBox>
        <JoinLogo>
          <Link to={MAIN_PATH}>
            <JoinLogoIcon />
          </Link>
          <span>회원가입</span>
          <hr />
        </JoinLogo>
        <JoinForm onSubmit={handleSubmit}>
          <JoinInputBox>
            <span>이름</span>
            <input
              name="name"
              type="text"
              maxLength={20}
              autoFocus
              value={formData.name}
              onChange={handleChange}
              required
            />
            {error && error.nameError && (
              <ErrorMessage>{error.nameError}</ErrorMessage>
            )}
          </JoinInputBox>
          <JoinInputBox>
            <span>이메일</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {error && error.emailError && (
              <ErrorMessage>{error.emailError}</ErrorMessage>
            )}
          </JoinInputBox>
          <JoinInputBox>
            <span>아이디</span>
            <input
              name="username"
              type="text"
              maxLength={20}
              value={formData.username}
              onChange={handleChange}
              required
            />
            {error && error.usernameError && (
              <ErrorMessage>{error.usernameError}</ErrorMessage>
            )}
          </JoinInputBox>
          <JoinPasswordBox>
            <span>비밀번호</span>
            <JoinPasswordInputBox>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                maxLength={16}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {showPassword ? (
                <BiHide onClick={passwordToggle} />
              ) : (
                <BiShow onClick={passwordToggle} />
              )}
            </JoinPasswordInputBox>
            {error && error.passwordError && (
              <ErrorMessage>{error.passwordError}</ErrorMessage>
            )}
          </JoinPasswordBox>
          <JoinPasswordBox>
            <span>비밀번호 확인</span>
            <JoinPasswordInputBox>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                maxLength={16}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {showConfirmPassword ? (
                <BiHide onClick={confirmPasswordToggle} />
              ) : (
                <BiShow onClick={confirmPasswordToggle} />
              )}
            </JoinPasswordInputBox>
            {error && error.confirmPasswordError && (
              <ErrorMessage>{error.confirmPasswordError}</ErrorMessage>
            )}
          </JoinPasswordBox>
          <JoinBtn type="submit">회원가입</JoinBtn>
        </JoinForm>
      </JoinBox>
    </Box>
  );
}

export default Join;
