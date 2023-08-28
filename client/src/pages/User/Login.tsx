import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import { styled } from "styled-components";
import loginImg from "../../assets/Login/login.jpeg";
import { RiCameraLensFill } from "react-icons/ri";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const Box = styled.div`
  display: grid;
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
      border: 1.75px solid #636e72;
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
    border: 1.75px solid #636e72;
  }

  input {
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 15px;
  }
`;

const LoginBtn = styled.button`
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

interface Error {
  passwordError: string;
  userError: string;
}

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<Error>();

  const [showPassword, setShowPassword] = useState(false);

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedFormData = {
      ...formData,
      password: CryptoJS.SHA256(formData.password).toString(),
    };

    await axios
      .post("http://localhost:4000/login", hashedFormData, {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        setSessionData(response.data.user);
        navigate("/");
      })
      .catch((error) => setError(error.response.data));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setError({
      passwordError: "",
      userError: "",
    });
  };

  const passwordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      <LoginImgContainer>
        <LoginImg />
      </LoginImgContainer>
      <LoginBox>
        <LoginLogo>
          <LoginLogoIcon />
          <span>로그인</span>
          <hr />
        </LoginLogo>
        <LoginForm onSubmit={handleSubmit}>
          <LoginInputBox>
            <span>사용자 이름 또는 이메일</span>
            <input
              name="username"
              type="text"
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
                <BiSolidHide onClick={passwordToggle} />
              ) : (
                <BiSolidShow onClick={passwordToggle} />
              )}
            </LoginPasswordInputBox>
            {error && error.passwordError && (
              <ErrorMessage>{error.passwordError}</ErrorMessage>
            )}
          </LoginPasswordBox>
          <LoginBtn type="submit">로그인</LoginBtn>
        </LoginForm>
      </LoginBox>
    </Box>
  );
}

export default Login;
