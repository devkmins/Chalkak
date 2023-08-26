import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import { styled } from "styled-components";
import loginImg from "../../assets/Login/login.jpeg";
import { RiCameraLensFill } from "react-icons/ri";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  min-height: 100vh;
`;

const LoginImg = styled.div`
  background-image: url(${loginImg});
  width: 100%;
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
    margin-top: 25px;
    font-size: 24px;
    font-weight: 500;
  }
`;

const LoginForm = styled.form`
  display: inherit;
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
    height: 30%;

    &:focus {
      border: 1px solid green;
    }
  }
`;

const LoginBtn = styled.button`
  height: 35%;
`;

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

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
      .catch((error) => setError(error.response.data.error));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box>
      <LoginImg />
      <LoginBox>
        <LoginLogo>
          <RiCameraLensFill size={100} />
          <span>로그인</span>
        </LoginLogo>
        {error && <p>{error}</p>}
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
          </LoginInputBox>
          <LoginInputBox>
            <span>비밀번호</span>

            <input
              name="password"
              type="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
          </LoginInputBox>
          <LoginBtn type="submit">로그인</LoginBtn>
        </LoginForm>
      </LoginBox>
    </Box>
  );
}

export default Login;
