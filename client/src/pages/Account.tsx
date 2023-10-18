// Libraries
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

// Package
import { styled } from "styled-components";

// React
import { useEffect, useRef, useState } from "react";

// Atom
import { sessionState } from "../atoms/sessionAtom";

// Components
import Header from "../components/Header";
import AccountMenu from "../components/AccountMenu";
import useSearchClear from "../hooks/useSearchClear";
import NotificationBar from "../components/NotificationBar";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Styles
import { useMobile } from "../styles/mediaQueries";
import {
  BLACK_COLOR,
  ERROR_MESSAGE_COLOR,
  LIGHT_GRAY_COLOR,
  NORMAL_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Constants
import { ACCOUNT_UPDATED_TEXT } from "../constants/notificationMessages";
import {
  EMAIL_VALIDITY_ERROR,
  USERNAME_LENGTH_ERROR,
  USERNAME_WHITE_SPACE_ERROR,
} from "../constants/errorMessages";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  emailError: string;
  usernameError: string;
}

const Container = styled.div``;

const Box = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const EditSection = styled.section<IIsMobile>`
  margin: 0px 25px 0px 0px;
  min-height: 50vh;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    margin: 40px 25px 0px 22.5px
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

const EditBox = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: 35% 65%;
  margin-top: 50px;
  height: 100%;
`;

const ProfileImgBox = styled.div<IIsMobile>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.$isMobile === "true" && "25px"};
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditProfileImg = styled.input`
  display: none;
`;

const CustomButton = styled.span`
  margin-top: 12.5px;
  font-size: 14px;
  cursor: pointer;
  color: ${NORMAL_GRAY_COLOR};
  border-bottom: 1px solid currentColor;

  &:hover {
    color: ${BLACK_COLOR};
  }
`;

const EditForm = styled.form<IIsMobile>`
  input {
    margin-bottom: ${(props) => props.$isMobile === "true" && "35px"};
  }
`;

const EditInputContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  height: 100%;
`;

const EditInputBox = styled.div`
  display: flex;
  flex-direction: column;

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
      border: 1.25px solid ${BLACK_COLOR};
    }
  }
`;

const EditBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const EditBtn = styled.button<IIsMobile>`
  width: 100%;
  height: 45px;
  color: ${WHITE_COLOR};
  background-color: ${BLACK_COLOR};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: ${(props) => props.$isMobile === "true" && "25px"};
`;

const ErrorMessage = styled.span`
  margin-top: 7.5px;
  font-size: 13px;
  color: ${ERROR_MESSAGE_COLOR};
`;

function Account() {
  const searchKeywordsClear = useSearchClear();

  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const [formData, setFormData] = useState({
    name: sessionData.name,
    email: sessionData.email,
    username: sessionData.username,
  });

  const [error, setError] = useState<IError>();

  const [isUpdated, setIsUpdated] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const location = useLocation();
  const pathname = location.pathname;

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const userProfileImg = sessionData.profileImage;

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const trimUsername = formData.username.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(formData.email);

    if (formData.username.length < 3 || formData.username.length > 20) {
      setError((prevError: IError | undefined) => ({
        emailError: prevError?.emailError || "",
        usernameError: USERNAME_LENGTH_ERROR,
      }));

      return;
    }

    if (formData.username !== trimUsername || formData.username.includes(" ")) {
      setError((prevError: IError | undefined) => ({
        emailError: prevError?.emailError || "",
        usernameError: USERNAME_WHITE_SPACE_ERROR,
      }));

      return;
    }

    if (!isValidEmail) {
      setError((prevError: IError | undefined) => ({
        usernameError: prevError?.usernameError || "",
        emailError: EMAIL_VALIDITY_ERROR,
      }));

      return;
    }

    const response = await axios
      .put(`http://localhost:4000/account`, formData, { withCredentials: true })
      .then((response) => {
        setIsUpdated(true);
        setSessionData(response.data);
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
      emailError: "",
      usernameError: "",
    });
  };

  const handleInputClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFormClick = () => {
    handleSubmit();
  };

  const imgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files && event.target.files[0];
    const imgData = new FormData();

    if (img) {
      imgData.append("profileImg", img);
    }

    const responseImages = await axios.post(
      "http://localhost:4000/account/profileImg",
      imgData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setSessionData((prev) => {
      const newSessionData = { ...prev, profileImage: responseImages.data };

      return newSessionData;
    });
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => setIsUpdated(false), 3000);
  }, [isUpdated]);

  return (
    <>
      {isUpdated && <NotificationBar text={ACCOUNT_UPDATED_TEXT} />}
      <Container>
        <Header />
        <Box $isMobile={isMobileString}>
          <AccountMenu pathname={pathname} />
          <EditSection $isMobile={isMobileString}>
            <MainTitleBox>
              <MainTitle>프로필 편집</MainTitle>
            </MainTitleBox>
            <EditBox $isMobile={isMobileString}>
              <ProfileImgBox $isMobile={isMobileString}>
                <ProfileImg
                  key={userProfileImg}
                  alt=""
                  src={
                    userProfileImg
                      ? `http://localhost:4000/${userProfileImg}`
                      : defaultUserProfileImg
                  }
                />
                <CustomButton onClick={handleInputClick}>
                  프로필 이미지 변경
                </CustomButton>
                <EditProfileImg
                  onChange={imgChange}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                />
              </ProfileImgBox>
              <EditForm ref={formRef} $isMobile={isMobileString}>
                <EditInputContainer>
                  <EditInputBox>
                    <span>이름</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      required
                      onChange={handleChange}
                      onKeyDown={handleEnterKeyPress}
                    />
                  </EditInputBox>
                  <EditInputBox>
                    <span>이메일</span>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                      onKeyDown={handleEnterKeyPress}
                    />
                    {error && error.emailError && (
                      <ErrorMessage>{error.emailError}</ErrorMessage>
                    )}
                  </EditInputBox>
                  <EditInputBox>
                    <span>사용자 이름</span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      required
                      onChange={handleChange}
                      onKeyDown={handleEnterKeyPress}
                    />
                    {error && error.usernameError && (
                      <ErrorMessage>{error.usernameError}</ErrorMessage>
                    )}
                  </EditInputBox>
                </EditInputContainer>
              </EditForm>
            </EditBox>
            <EditBtnBox>
              <EditBtn onClick={handleFormClick} $isMobile={isMobileString}>
                계정 업데이트
              </EditBtn>
            </EditBtnBox>
          </EditSection>
        </Box>
      </Container>
    </>
  );
}

export default Account;
