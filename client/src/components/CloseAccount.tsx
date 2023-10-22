// Libraries
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";

// Package
import styled from "styled-components";

// React
import { useState } from "react";

// Atoms
import { loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";

// Components
import AccountMenu from "./AccountMenu";
import Header from "./Header";

// MediaQuery
import { useMobile } from "../styles/mediaQueries";

// Constants
import { ACCOUNT_CLOSURE_CONFIRMATION } from "../constants/confirmationMessages";
import { MAIN_PATH } from "../constants/paths";
import { COOKIE_NAME } from "../constants/cookieName";

// Styles
import {
  BLACK_COLOR,
  ERROR_MESSAGE_COLOR,
  INPUT_BOX_FOCUS_COLOR,
  LIGHT_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Api
import { accountApi } from "../apis/account";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  passwordError: string;
}

const Container = styled.div``;

const Box = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const CloseAccountSection = styled.section<IIsMobile>`
  margin-right: 25px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    margin-left: 22.5px;
    margin-top: 40px;
    `}
`;

const MainTitleBox = styled.div`
  padding-bottom: 25px;
  border-bottom: 1px solid ${LIGHT_GRAY_COLOR};
`;

const MainTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const WarningMessagesBox = styled.div`
  margin-top: 47.5px;
  line-height: 20px;

  span {
    font-size: 15px;
    font-weight: 300;

    &:first-child {
      font-weight: 600;
      color: ${ERROR_MESSAGE_COLOR};
    }
  }
`;

const WarningMessage = styled.span``;

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
      border: 1.25px solid ${INPUT_BOX_FOCUS_COLOR};
    }
  }
`;

const Btn = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 45px;
  color: ${WHITE_COLOR};
  background-color: ${BLACK_COLOR};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.span`
  margin-top: 7.5px;
  font-size: 13px;
  color: ${ERROR_MESSAGE_COLOR};
`;

function CloseAccount() {
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const [, , removeCookie] = useCookies([COOKIE_NAME]);

  const [formData, setFormData] = useState({
    password: "",
  });

  const [error, setError] = useState<IError>();

  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = window.confirm(ACCOUNT_CLOSURE_CONFIRMATION);

    if (result) {
      const hashedFormData = {
        password: CryptoJS.SHA256(formData.password).toString(),
      };

      const response = await accountApi
        .deleteCloseAccount(hashedFormData)
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
          removeCookie(COOKIE_NAME);
          navigate(MAIN_PATH);
        })
        .catch((error) => setError(error.response.data));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header />
      <Box $isMobile={isMobileString}>
        <AccountMenu pathname={pathname} />
        <CloseAccountSection $isMobile={isMobileString}>
          <MainTitleBox>
            <MainTitle>계정 폐쇄</MainTitle>
          </MainTitleBox>
          <WarningMessagesBox>
            <span>경고: </span>
            <WarningMessage>
              계정 폐쇄는 취소가 불가능합니다. 모든 사진들이 삭제되며 이는
              되돌릴 수 없습니다.
            </WarningMessage>
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
