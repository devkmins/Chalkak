// Api
import client from "./config";

interface Cookies {
  [key: string]: string;
}

export const userApi = {
  postUserLogout: (cookies: Cookies) =>
    client.post("/user/logout", cookies, {
      withCredentials: true,
    }),
};
