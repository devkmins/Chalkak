import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../../atoms";
import styled from "styled-components";
import joinImg from "../../assets/Join/join.jpeg";
import { RiCameraLensFill } from "react-icons/ri";

const Box = styled.div`
  display: grid;
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

interface Error {
  usernameError: string;
  emailError: string;
  passwordError: string;
}

function Join() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<Error>();

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedJoinFormData = {
      ...formData,
      password: CryptoJS.SHA256(formData.password).toString(),
      confirmPassword: CryptoJS.SHA256(formData.confirmPassword).toString(),
    };

    const { username, password } = formData;

    const hashedLoginFormData = {
      username,
      password: CryptoJS.SHA256(formData.password).toString(),
    };

    const join = await axios
      .post("http://localhost:4000/join", hashedJoinFormData, {
        withCredentials: true,
      })
      .then(() => navigate("/login"))
      .catch((error) => setError(error.response.data));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setError({
      usernameError: "",
      emailError: "",
      passwordError: "",
    });
  };

  return (
    <Box>
      <JoinImgContainer>
        <JoinImg />
      </JoinImgContainer>
      <JoinBox>
        <JoinLogo>
          <JoinLogoIcon />
          <span>회원가입</span>
          <hr />
        </JoinLogo>
        <JoinForm onSubmit={handleSubmit}>
          <JoinInputBox>
            <span>이름</span>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
              value={formData.username}
              onChange={handleChange}
              required
            />
            {error && error.usernameError && (
              <ErrorMessage>{error.usernameError}</ErrorMessage>
            )}
          </JoinInputBox>
          <JoinInputBox>
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </JoinInputBox>
          <JoinInputBox>
            <span>비밀번호 확인</span>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && error.passwordError && (
              <ErrorMessage>{error.passwordError}</ErrorMessage>
            )}
          </JoinInputBox>
          <JoinBtn type="submit">회원가입</JoinBtn>
        </JoinForm>
      </JoinBox>
    </Box>
  );
}

export default Join;
