import axios from "axios";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import styled from "styled-components";
import Header from "../pages/Header";

const Container = styled.div``;

const Box = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const ChangePasswordSection = styled.section`
  margin-right: 25px;
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
  grid-template-rows: repeat(4, 32.5%);
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
    height: 40%;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.25px solid #111111;
    }
  }
`;

const BtnBox = styled.div`
  width: 100%;
`;

const Btn = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const location = useLocation();
  const pathname = location.pathname;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedFormData = {
      currentPassword: CryptoJS.SHA256(formData.currentPassword).toString(),
      newPassword: CryptoJS.SHA256(formData.newPassword).toString(),
      newConfirmPassword: CryptoJS.SHA256(
        formData.newConfirmPassword
      ).toString(),
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/account/password`,
        hashedFormData,
        { withCredentials: true }
      );

      navigate("/");
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

  return (
    <Container>
      <Header />
      <Box>
        <AccountMenu pathname={pathname} />
        <ChangePasswordSection>
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
              </InputBox>
              <BtnBox>
                <Btn type="submit">비밀번호 변경</Btn>
              </BtnBox>
            </form>
          </ChangePasswordBox>
        </ChangePasswordSection>
      </Box>
    </Container>
  );
}

export default ChangePassword;
