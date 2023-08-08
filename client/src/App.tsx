import React from "react";
import Posts from "./components/Posts";
import Join from "./components/Join";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, ,] = useCookies(["loggedIn"]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        {cookies.loggedIn ? (
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
