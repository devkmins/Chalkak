import React, { useEffect } from "react";
import Posts from "./components/Posts";
import Join from "./components/Join";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { useCookies } from "react-cookie";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "./atoms";
import UserPage from "./components/UserPage";

function App() {
  const [cookies, ,] = useCookies(["loggedIn", "user"]);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  useEffect(() => {
    if (cookies.loggedIn) {
      setLoggedIn(true);
      setSessionData(cookies.user);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/user/:id" element={<UserPage />} />
        {loggedIn ? (
          <>
            <Route path="/join" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/user/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/logout" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
