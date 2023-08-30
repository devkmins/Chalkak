import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import AccountMenu from "./AccountMenu";

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
    <>
      <AccountMenu pathname={pathname} />
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
    </>
  );
}

export default CloseAccount;
