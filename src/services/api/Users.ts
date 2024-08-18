import { queryString } from "../../utils/utils";
import HttpTransport from "../HttpTransport";
import { BASE_URL } from "../../utils/constants";
import { ChangePasswordRequest, FindUserRequest } from "./types";
const http = new HttpTransport();
const url = (path = "", getParams?: { [key: string]: any }) =>
  `${BASE_URL}/user${path}${getParams ? "?" + queryString(getParams) : ""}`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const Users = {
  changeProfile(data: { [key: string]: string }) {
    return http.put(url("/profile"), { data, headers });
  },
  changeAvatar(formData: FormData) {
    return http.put(url("/profile/avatar"), {
      data: formData,
    });
  },
  changePassword(data: ChangePasswordRequest) {
    return http.put(url("/password"), { data, headers });
  },
  search(data: FindUserRequest) {
    return http.post(url("/search"), { data, headers });
  },
};
