import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionState } from "../atoms";
import { styled } from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import AccountMenu from "./AccountMenu";

const ProfileImgBox = styled.div`
  width: min-content;
  height: min-content;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
`;

const EditProfileImg = styled.input`
  display: none;
`;

const CustomButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

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

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
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
    <>
      <AccountMenu pathname={pathname} />
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
        <CustomButton onClick={handleButtonClick}>파일 선택</CustomButton>
        <EditProfileImg
          onChange={imgChange}
          ref={fileInputRef}
          type="file"
          accept="image/*"
        />
      </ProfileImgBox>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          required
          onChange={handleChange}
        />
        <button type="submit">계정 업데이트</button>
      </form>
      <div>
        <Link to={"/account"}>프로필 수정</Link>
        <Link to={"/account/password"}>비밀번호 변경</Link>
        <Link to={"/account/close"}>회원탈퇴</Link>
      </div>
    </>
  );
}

export default Account;
