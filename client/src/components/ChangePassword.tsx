// Libraries
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

// Package
import styled from "styled-components";

// React
import { useEffect, useState } from "react";

// Components
import AccountMenu from "./AccountMenu";
import Header from "./Header";
import NotificationBar from "./NotificationBar";
import { InputBoxAndSpan } from "./AccountInput";
import { ErrorMessage } from "./ErrorMessage";

// MediaQuery
import { useMobile } from "../styles/mediaQueries";

// Constants
import { PASSWORD_CHANGED_TEXT } from "../constants/notificationMessages";
import {
  PASSWORD_COMPLEXITY_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_WHITE_SPACE_ERROR,
} from "../constants/errorMessages";
import { LIGHT_GRAY_COLOR } from "../constants/colors";

// Style
import { Btn } from "./Button/Btn";

// Api
import { accountApi } from "../apis/account";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  currentPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
}

const Container = styled.div``;

const Box = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const ChangePasswordSection = styled.section<IIsMobile>`
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

const ChangePasswordBox = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 26%);
  margin-top: 50px;
  min-height: 50vh;
`;

const BtnBox = styled.div`
  width: 100%;
  margin-top: 22px;
`;

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  const [error, setError] = useState<IError>();

  const location = useLocation();
  const pathname = location.pathname;

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimPassword = formData.newPassword.trim();

    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).*(?=.*[0-9]).*$/;
    const isValidPassword = passwordRegex.test(formData.newPassword);

    if (
      formData.newPassword !== trimPassword ||
      formData.newPassword.includes(" ")
    ) {
      setError((prevError: IError | undefined) => ({
        currentPasswordError: prevError?.currentPasswordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        newPasswordError: PASSWORD_WHITE_SPACE_ERROR,
      }));

      return;
    }

    if (formData.newPassword.length < 8 || formData.newPassword.length > 16) {
      setError((prevError: IError | undefined) => ({
        currentPasswordError: prevError?.currentPasswordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        newPasswordError: PASSWORD_LENGTH_ERROR,
      }));

      return;
    }

    if (!isValidPassword) {
      setError((prevError: IError | undefined) => ({
        currentPasswordError: prevError?.currentPasswordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        newPasswordError: PASSWORD_COMPLEXITY_ERROR,
      }));

      return;
    }

    const hashedFormData = {
      currentPassword: CryptoJS.SHA256(formData.currentPassword).toString(),
      newPassword: CryptoJS.SHA256(formData.newPassword).toString(),
      newConfirmPassword: CryptoJS.SHA256(
        formData.newConfirmPassword
      ).toString(),
    };

    const response = await accountApi
      .patchChangePassword(hashedFormData)
      .then((response) => {
        setIsChanged(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          newConfirmPassword: "",
        });
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
      currentPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
    });
  };

  useEffect(() => {
    setTimeout(() => setIsChanged(false), 3000);
  }, [isChanged]);

  return (
    <>
      {isChanged && <NotificationBar text={PASSWORD_CHANGED_TEXT} />}
      <Container>
        <Header />
        <Box $isMobile={isMobileString}>
          <AccountMenu pathname={pathname} />
          <ChangePasswordSection $isMobile={isMobileString}>
            <MainTitleBox>
              <MainTitle>비밀번호 변경</MainTitle>
            </MainTitleBox>
            <ChangePasswordBox>
              <form onSubmit={handleSubmit}>
                <InputBoxAndSpan>
                  <span>현재 비밀번호</span>
                  <input
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                  {error && error.currentPasswordError && (
                    <ErrorMessage>{error.currentPasswordError}</ErrorMessage>
                  )}
                </InputBoxAndSpan>
                <InputBoxAndSpan>
                  <span>비밀번호</span>
                  <input
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  {error && error.newPasswordError && (
                    <ErrorMessage>{error.newPasswordError}</ErrorMessage>
                  )}
                </InputBoxAndSpan>
                <InputBoxAndSpan>
                  <span>비밀번호 확인</span>
                  <input
                    name="newConfirmPassword"
                    type="password"
                    value={formData.newConfirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {error && error.confirmPasswordError && (
                    <ErrorMessage>{error.confirmPasswordError}</ErrorMessage>
                  )}
                </InputBoxAndSpan>
                <BtnBox>
                  <Btn type="submit">비밀번호 변경</Btn>
                </BtnBox>
              </form>
            </ChangePasswordBox>
          </ChangePasswordSection>
        </Box>
      </Container>
    </>
  );
}

export default ChangePassword;
