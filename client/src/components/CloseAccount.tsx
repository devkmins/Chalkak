import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import AccountMenu from "./AccountMenu";
import styled from "styled-components";
import Header from "../pages/Header";

interface Error {
  passwordError: string;
}

const Container = styled.div``;

const Box = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const CloseAccountSection = styled.section`
  margin-right: 25px;
  min-height: 50vh;
`;

const MainTitleBox = styled.div`
  padding-bottom: 25px;
  border-bottom: 1px solid #dddddd;
`;

const MainTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const WarningMessagesBox = styled.div`
  white-space: nowrap;
  margin-top: 50px;

  span {
    font-size: 15px;
    font-weight: 300;

    &:first-child {
      font-weight: 600;
      color: #ff6b6b;
    }
  }
`;

const Form = styled.form`
  margin-top: 12.5px;
  height: 100%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  input {
    border-radius: 5px;
    border: 1px solid gray;
    height: 45px;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.25px solid #111111;
    }
  }
`;

const Btn = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 45px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.span`
  margin-top: 7.5px;
  font-size: 13px;
  color: #ff6b6b;
`;

function CloseAccount() {
  const navigate = useNavigate();

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const [, , removeCookie] = useCookies(["connect.sid"]);

  const [formData, setFormData] = useState({
    password: "",
  });

  const location = useLocation();
  const pathname = location.pathname;

  const [error, setError] = useState<Error>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const result = window.confirm("계정을 정말 폐쇄하실 건가요?");

    if (result) {
      const hashedFormData = {
        password: CryptoJS.SHA256(formData.password).toString(),
      };

      const response = await axios
        .delete(`http://localhost:4000/account/close`, {
          withCredentials: true,
          data: hashedFormData,
        })
        .then((response) => {
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

          navigate("/");
        })
        .catch((error) => setError(error.response.data));
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header />
      <Box>
        <AccountMenu pathname={pathname} />
        <CloseAccountSection>
          <MainTitleBox>
            <MainTitle>계정 폐쇄</MainTitle>
          </MainTitleBox>
          <WarningMessagesBox>
            <span>경고: </span>
            <span>
              계정 폐쇄는 취소가 불가능합니다. 모든 사진들이 삭제되며 이는
              되돌릴 수 없습니다.
            </span>
          </WarningMessagesBox>
          <Form onSubmit={handleSubmit}>
            <InputBox>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                required
              />
              {error && error.passwordError && (
                <ErrorMessage>{error.passwordError}</ErrorMessage>
              )}
              <Btn type="submit">계정 폐쇄</Btn>
            </InputBox>
          </Form>
        </CloseAccountSection>
      </Box>
    </Container>
  );
}

export default CloseAccount;
