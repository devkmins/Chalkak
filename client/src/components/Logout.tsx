import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import { useCookies } from "react-cookie";

function Logout() {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const [cookies, , removeCookie] = useCookies([
    "connect.sid",
    "loggedIn",
    "user",
  ]);

  const logout = async () => {
    await axios
      .post("http://localhost:4000/user/logout", "", {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn(false);
        setSessionData({
          email: "",
          username: "",
          name: "",
          socialOnly: false,
        });
        removeCookie("connect.sid");
        removeCookie("loggedIn");
        removeCookie("user");
        navigate("/");
      });
  };

  useEffect(() => {
    logout();
  });

  return null;
}

export default Logout;
