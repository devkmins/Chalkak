import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../atoms";

function useGetLoginData() {
  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  useEffect(() => {
    axios
      .get("http://localhost:4000/login", { withCredentials: true })
      .then((response) => {
        setLoggedIn(response.data.loggedIn);
        setSessionData(response.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  return null;
}

export default useGetLoginData;
