import HttpTransport from "../HttpTransport";
import { SignUpRequest, SignInRequest } from "./types";
import { BASE_URL } from "../../utils/constants";
import { queryString } from "../../utils/utils";
const http = new HttpTransport();
const url = (path = "", getParams?: { [key: string]: any }) =>
  `${BASE_URL}/auth${path}${getParams ? "?" + queryString(getParams) : ""}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const Auth = {
  signup(data: SignUpRequest) {
    return http.post(url("/signup"), {
      data,
      headers,
    });
  },
  signin(data: SignInRequest) {
    return http.post(url("/signin"), {
      data,
      headers,
    });
  },
  user() {
    return http.get(url("/user"), { headers });
  },
  logout() {
    return http.post(url("/logout", { headers }));
  },
};
