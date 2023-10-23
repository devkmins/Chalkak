// Libraries
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// Atoms
import { sessionState } from "../atoms/sessionAtom";
import { isLoggedOutState, loggedInState } from "../atoms/authAtoms";

// Constants
import { COOKIE_NAME } from "../constants/cookieName";
import { MAIN_PATH } from "../constants/paths";

// Api
import { userApi } from "../apis/user";

function useLogout() {
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);
  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);
  const [cookies, , removeCookie] = useCookies([COOKIE_NAME]);

  const navigate = useNavigate();

  const logout = async () => {
    await userApi.postUserLogout(cookies).then(() => {
      setLoggedIn(false);
      setSessionData({
        email: "",
        username: "",
        name: "",
        profileImage: "",
        socialOnly: false,
        _id: "",
      });
      removeCookie(COOKIE_NAME);
      setIsLoggedOut(true);
      navigate(MAIN_PATH);
    });
  };

  return logout;
}

export default useLogout;
