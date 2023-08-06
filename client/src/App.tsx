import React from "react";
import Posts from "./components/Posts";
import Join from "./components/Join";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useRecoilValue } from "recoil";
import Logout from "./components/Logout";
import { loggedInState } from "./atoms";
import useGetLoginData from "./hooks/useGetLoginData";

function App() {
  const loggedIn = useRecoilValue(loggedInState);
  useGetLoginData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
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
            <Route path="/user/logout" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
