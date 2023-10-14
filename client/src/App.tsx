// Libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

// React
import React, { Suspense, lazy, useEffect } from "react";

// Atoms
import {
  currentPostState,
  currentUserPageState,
} from "./atoms/currentPostAtoms";
import { loggedInState } from "./atoms/authAtoms";
import { sessionState } from "./atoms/sessionAtom";

// Page
import Main from "./pages/MainPage";

// Style
import { GlobalStyle } from "./styles/globalStyle";

// Constants
import {
  ACCOUNT_PATH,
  CHANGE_PASSWORD_PATH,
  CLOSE_ACCOUNT_PATH,
  JOIN_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  POST_DETAIL_PATH,
  POST_UPLOAD_PATH,
  SEARCH_KEYWORD_PATH,
  USER_LIKES_PATH,
  USER_PROFILE_PATH,
} from "./constants/paths";

const Login = lazy(() => import("./pages/Login"));
const Join = lazy(() => import("./pages/Join"));
const UserPage = lazy(() => import("./pages/UserPage"));
const Account = lazy(() => import("./pages/Account"));
const DetailPost = lazy(() => import("./components/DetailPost"));
const UploadImage = lazy(() => import("./pages/UploadImage"));
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
          <Route path={MAIN_PATH} element={<Main />} />
          <Route
            path={USER_PROFILE_PATH}
            element={<UserPage key={currentUserPage} />}
          />
          <Route path={USER_LIKES_PATH} element={<UserPage />} />
          <Route
            path={POST_DETAIL_PATH}
            element={<DetailPost key={currentPost} />}
          />
          <Route path={SEARCH_KEYWORD_PATH} element={<SearchPostList />} />
          {loggedIn ? (
            <>
              <Route path={JOIN_PATH} element={<Navigate to="/" />} />
              <Route path={LOGIN_PATH} element={<Navigate to="/" />} />
              <Route path={ACCOUNT_PATH} element={<Account />} />
              <Route path={CLOSE_ACCOUNT_PATH} element={<CloseAccount />} />
              <Route path={CHANGE_PASSWORD_PATH} element={<ChangePassword />} />
              <Route path={POST_UPLOAD_PATH} element={<UploadImage />} />
            </>
          ) : (
            <>
              <Route path={JOIN_PATH} element={<Join />} />
              <Route path={LOGIN_PATH} element={<Login />} />
              <Route path={ACCOUNT_PATH} element={<Navigate to="/" />} />
              <Route path={CLOSE_ACCOUNT_PATH} element={<Navigate to="/" />} />
              <Route
                path={CHANGE_PASSWORD_PATH}
                element={<Navigate to="/" />}
              />
              <Route path={POST_UPLOAD_PATH} element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
