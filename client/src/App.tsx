import React from "react";
import Posts from "./components/Posts";
import { QueryClient, QueryClientProvider } from "react-query";
import Join from "./components/Join";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useRecoilValue } from "recoil";
import Logout from "./components/Logout";
import { loggedInState } from "./atoms/atoms";

const queryClient = new QueryClient();

function App() {
  const loggedIn = useRecoilValue(loggedInState);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Posts />} />
          {loggedIn ? (
            <>
              <Route path="/user/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
