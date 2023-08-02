import React from "react";
import Posts from "./components/Posts";
import { QueryClient, QueryClientProvider } from "react-query";
import Join from "./components/Join";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { RecoilRoot } from "recoil";
import Logout from "./components/Logout";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Posts />}></Route>
            <Route path="/join" element={<Join />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user/logout" element={<Logout />}></Route>
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
