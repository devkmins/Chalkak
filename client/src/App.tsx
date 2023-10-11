import React, { useEffect } from "react";
import Join from "./pages/User/Join";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/User/Login";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPostState,
  currentUserPageState,
  loggedInState,
  sessionState,
} from "./atoms";
import UserPage from "./components/UserPage";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import CloseAccount from "./components/CloseAccount";
import UploadImage from "./components/UploadImage";
import axios from "axios";
import DetailPost from "./components/DetailPost";
import SearchPostList from "./components/SearchPostList";
import Main from "./pages/Main";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Source+Sans+Pro:wght@300;400&display=swap');
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
