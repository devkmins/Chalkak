import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionState } from "../atoms";
import { styled } from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import Header from "../pages/Header";
import AccountMenu from "./AccountMenu";

const Container = styled.div``;

const Box = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const EditSection = styled.section`
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

const EditBox = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  margin-top: 50px;
  height: 100%;
`;

const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const EditProfileImg = styled.input`
  display: none;
`;

const CustomButton = styled.span`
  margin-top: 12.5px;
  font-size: 14px;
  cursor: pointer;
  color: #767676;
  border-bottom: 1px solid currentColor;

  &:hover {
    color: #111111;
  }
`;

const EditForm = styled.form``;

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
    height: 40%;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.5px solid #111111;
    }
  }
`;

const EditBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
`;

const EditBtn = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;

function Account() {
  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const [formData, setFormData] = useState({
    name: sessionData.name,
    email: sessionData.email,
    username: sessionData.username,
  });
  const userProfileImg = sessionData.profileImage;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const pathname = location.pathname;

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/account`,
        formData,
        { withCredentials: true }
      );

      setSessionData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFormClick = () => {
    handleSubmit();
  };

  const imgChange = async (event: any) => {
    const img = event.target.files[0];
    const imgData = new FormData();

    imgData.append("profileImg", img);

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

  return (
    <Container>
      <Header />
      <Box>
        <AccountMenu pathname={pathname} />
        <EditSection>
          <MainTitleBox>
            <MainTitle>프로필 편집</MainTitle>
          </MainTitleBox>
          <EditBox>
            <ProfileImgBox>
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
            <EditForm>
              <EditInputContainer>
                <EditInputBox>
                  <span>이름</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                  />
                </EditInputBox>
                <EditInputBox>
                  <span>이메일</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                  />
                </EditInputBox>
                <EditInputBox>
                  <span>사용자 이름</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    required
                    onChange={handleChange}
                  />
                </EditInputBox>
              </EditInputContainer>
            </EditForm>
          </EditBox>
          <EditBtnBox>
            <EditBtn onClick={handleFormClick}>계정 업데이트</EditBtn>
          </EditBtnBox>
        </EditSection>
      </Box>
    </Container>
  );
}

export default Account;
