// Libraries
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
import { InputBoxAndSpan } from "../components/SettingsInput";
import { ErrorMessage } from "../components/ErrorMessage";
import {
  DefaultBox,
  DefaultContainer,
  DefaultSection,
  MainTitle,
  MainTitleBox,
} from "../components/SettingsDefaultStyle";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Styles
import { useMobile } from "../styles/mediaQueries";
import { Btn } from "../components/Button/Btn";

// Constants
import { ACCOUNT_UPDATED_TEXT } from "../constants/notificationMessages";
import {
  EMAIL_VALIDITY_ERROR,
  USERNAME_LENGTH_ERROR,
  USERNAME_WHITE_SPACE_ERROR,
} from "../constants/errorMessages";
import { BLACK_COLOR, NORMAL_GRAY_COLOR } from "../constants/colors";

// Api
import { accountApi } from "../apis/account";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IError {
  emailError: string;
  usernameError: string;
}

const Container = styled(DefaultContainer)``;

const Box = styled(DefaultBox)``;

const EditSection = styled(DefaultSection)``;

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

const EditBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const EditBtn = styled(Btn)<IIsMobile>`
  margin-bottom: ${(props) => props.$isMobile === "true" && "25px"};
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

    const response = await accountApi
      .putEditProfile(formData)
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

    const responseImages = await accountApi.postEditProfileImg(imgData);

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
                  <InputBoxAndSpan>
                    <span>이름</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      required
                      onChange={handleChange}
                      onKeyDown={handleEnterKeyPress}
                    />
                  </InputBoxAndSpan>
                  <InputBoxAndSpan>
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
                  </InputBoxAndSpan>
                  <InputBoxAndSpan>
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
                  </InputBoxAndSpan>
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
