import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedOutState, loggedInState, sessionState } from "../../atoms";
import { useCookies } from "react-cookie";

function Logout() {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies(["connect.sid"]);

  const logout = async () => {
    await axios
      .post("http://localhost:4000/user/logout", cookies, {
        withCredentials: true,
      })
      .then(() => {
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
        setIsLoggedOut(true);
        navigate("/");
      });
  };

  useEffect(() => {
    logout();
  });

  return null;
}

export default Logout;
