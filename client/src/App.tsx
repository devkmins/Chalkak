import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPostState,
  currentUserPageState,
  loggedInState,
  sessionState,
} from "./atoms";
import axios from "axios";
import Main from "./pages/Main";
import { GlobalStyle } from "./styles/globalStyle";

const Login = lazy(() => import("./pages/User/Login"));
const Join = lazy(() => import("./pages/User/Join"));
const UserPage = lazy(() => import("./components/UserPage"));
const Account = lazy(() => import("./components/Account"));
const DetailPost = lazy(() => import("./components/DetailPost"));
const UploadImage = lazy(() => import("./components/UploadImage"));
const SearchPostList = lazy(() => import("./components/SearchPostList"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const CloseAccount = lazy(() => import("./components/CloseAccount"));

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  const currentPost = useRecoilValue(currentPostState);
  const currentUserPage = useRecoilValue(currentUserPageState);

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
    <Suspense fallback={<h1>로딩 중입니다...</h1>}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/user/:id"
            element={<UserPage key={currentUserPage} />}
          />
          <Route path="/user/:id/likes" element={<UserPage />} />
          <Route path="/post/:id" element={<DetailPost key={currentPost} />} />
          <Route path="/search/:keyword" element={<SearchPostList />} />
          {loggedIn ? (
            <>
              <Route path="/join" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/close" element={<CloseAccount />} />
              <Route path="/account/password" element={<ChangePassword />} />
              <Route path="/post/upload" element={<UploadImage />} />
            </>
          ) : (
            <>
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Navigate to="/" />} />
              <Route path="/account/close" element={<Navigate to="/" />} />
              <Route path="/account/password" element={<Navigate to="/" />} />
              <Route path="/post/upload" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
