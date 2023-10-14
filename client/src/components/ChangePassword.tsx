import axios from "axios";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import styled from "styled-components";
import Header from "../pages/Header";
import NotificationBar from "./NotificationBar";
import { useMobile } from "../styles/mediaQueries";
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
  border-bottom: 1px solid #dddddd;
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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  span {
    margin-bottom: 5px;
    font-weight: 500;
  }

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

const BtnBox = styled.div`
  width: 100%;
  margin-top: 22px;
`;

const Btn = styled.button`
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

function ChangePassword() {
  const isMobile = useMobile();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const location = useLocation();
  const pathname = location.pathname;

  const [error, setError] = useState<IError>();

  const [isChanged, setIsChanged] = useState(false);

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
        newPasswordError: "비밀번호에는 공백이 포함되어서는 안 됩니다.",
      }));
      return;
    }

    if (formData.newPassword.length < 8 || formData.newPassword.length > 16) {
      setError((prevError: IError | undefined) => ({
        currentPasswordError: prevError?.currentPasswordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        newPasswordError: "비밀번호는 8자 이상 16자 이하여야 합니다.",
      }));
      return;
    }

    if (!isValidPassword) {
      setError((prevError: IError | undefined) => ({
        currentPasswordError: prevError?.currentPasswordError || "",
        confirmPasswordError: prevError?.confirmPasswordError || "",
        newPasswordError:
          "비밀번호는 1개 이상의 숫자, 특수문자가 포함되어야 합니다.",
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

    const response = await axios
      .patch(`http://localhost:4000/account/password`, hashedFormData, {
        withCredentials: true,
      })
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

  const changePasswordText = "비밀번호가 변경되었습니다.";

  return (
    <>
      {isChanged && <NotificationBar text={changePasswordText} />}
      <Container>
        <Header />
        <Box $isMobile={String(isMobile)}>
          <AccountMenu pathname={pathname} />
          <ChangePasswordSection $isMobile={String(isMobile)}>
            <MainTitleBox>
              <MainTitle>비밀번호 변경</MainTitle>
            </MainTitleBox>
            <ChangePasswordBox>
              <form onSubmit={handleSubmit}>
                <InputBox>
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
                </InputBox>
                <InputBox>
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
                </InputBox>
                <InputBox>
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
                </InputBox>
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
