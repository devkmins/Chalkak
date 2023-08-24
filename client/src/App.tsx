import React, { useEffect } from "react";
import Posts from "./components/Posts";
import Join from "./components/Join";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "./atoms";
import UserPage from "./components/UserPage";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import CloseAccount from "./components/CloseAccount";
import UploadImage from "./components/UploadImage";
import axios from "axios";
import DetailPost from "./components/DetailPost";
import SearchPostList from "./components/SearchPostList";

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  useEffect(() => {
    axios
      .get("http://localhost:4000/login", {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(response.data.loggedIn);
        setSessionData(response.data.user);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/search/:keyword" element={<SearchPostList />} />
        {loggedIn ? (
          <>
            <Route path="/join" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/close" element={<CloseAccount />} />
            <Route path="/account/password" element={<ChangePassword />} />
            <Route path="/post/upload" element={<UploadImage />} />
          </>
        ) : (
          <>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/logout" element={<Navigate to="/" />} />
            <Route path="/account" element={<Navigate to="/" />} />
            <Route path="/account/close" element={<Navigate to="/" />} />
            <Route path="/account/password" element={<Navigate to="/" />} />
            <Route path="/post/upload" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
