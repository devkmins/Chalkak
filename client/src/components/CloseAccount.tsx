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
import { InputBox } from "./SettingsInput";
import { ErrorMessage } from "./ErrorMessage";
import {
  DefaultBox,
  DefaultContainer,
  DefaultSection,
  MainTitle,
  MainTitleBox,
} from "./SettingsDefaultStyle";

// MediaQuery
import { useMobile } from "../styles/mediaQueries";

// Constants
import { ACCOUNT_CLOSURE_CONFIRMATION } from "../constants/confirmationMessages";
import { MAIN_PATH } from "../constants/paths";
import { COOKIE_NAME } from "../constants/cookieName";
import { ERROR_MESSAGE_COLOR } from "../constants/colors";

// Styles
import { Btn } from "./Button/Btn";

// Api
import { accountApi } from "../apis/account";

interface IError {
  passwordError: string;
}

const Container = styled(DefaultContainer)``;

const Box = styled(DefaultBox)``;

const CloseAccountSection = styled(DefaultSection)``;

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

const BtnBox = styled.div`
  width: 100%;
  margin-top: 50px;
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
              <BtnBox>
                <Btn type="submit">계정 폐쇄</Btn>
              </BtnBox>
            </InputBox>
          </Form>
        </CloseAccountSection>
      </Box>
    </Container>
  );
}

export default CloseAccount;
