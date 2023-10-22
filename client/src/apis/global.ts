// Api
import client from "./config";

interface JoinFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

export const globalApi = {
  getSearchPostsByPage: (searchKeyword: string, page: number) =>
    client.get(`/search/${searchKeyword}?page=${page}`, {
      withCredentials: true,
    }),
  getSearchPostsByKeyword: (keyword: string) =>
    client.get(`/search/${keyword}`, { withCredentials: true }),
  postJoin: (hashedJoinFormData: JoinFormData) =>
    client.post("/join", hashedJoinFormData, {
      withCredentials: true,
    }),
  postLogin: (hashedFormData: LoginFormData) =>
    client.post("/login", hashedFormData, {
      withCredentials: true,
    }),
};
