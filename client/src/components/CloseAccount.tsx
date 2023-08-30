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

const Container = styled.div``;

const Box = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  padding-top: 100px;
`;

const CloseAccountSection = styled.section``;

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedFormData = {
      password: CryptoJS.SHA256(formData.password).toString(),
    };

    try {
      const response = await axios.delete(
        `http://localhost:4000/account/close`,
        { withCredentials: true, data: hashedFormData }
      );

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
        <CloseAccountSection>
          <span>계정 폐쇄</span>
          <form onSubmit={handleSubmit}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </form>
        </CloseAccountSection>
      </Box>
    </Container>
  );
}

export default CloseAccount;
