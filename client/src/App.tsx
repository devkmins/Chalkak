import React, { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPostState,
  currentUserPageState,
  loggedInState,
  sessionState,
} from "./atoms";
import axios from "axios";
import { createGlobalStyle } from "styled-components";

const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/User/Login"));
const Join = lazy(() => import("./pages/User/Join"));
const UserPage = lazy(() => import("./components/UserPage"));
const Account = lazy(() => import("./components/Account"));
const DetailPost = lazy(() => import("./components/DetailPost"));
const UploadImage = lazy(() => import("./components/UploadImage"));
const SearchPostList = lazy(() => import("./components/SearchPostList"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const CloseAccount = lazy(() => import("./components/CloseAccount"));

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li, 
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video { 
	margin: 0;
 	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
	box-sizing: border-box;
}
body {
}
a {
	text-decoration: none;
	color: inherit;
}
input, textarea {
  outline: none;
  resize: none;
}
`;

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
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/:id" element={<UserPage key={currentUserPage} />} />
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
  );
}

export default App;
