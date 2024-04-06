import { queryString } from "../../utils/utils";
import HttpTransport from "../HttpTransport";
import { BASE_URL } from "../../utils/constants";
import {
  CreateChatRequest,
  DeleteChatRequest,
  GetChatRequest,
  GetChatUsersRequest,
  SetChatAvatarRequest,
  UsersRequest,
} from "./types";

const http = new HttpTransport();
const url = (path = "", getParams?: { [key: string]: any }) =>
  `${BASE_URL}/chats${path}${getParams ? "?" + queryString(getParams) : ""}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const Chats = {
  get(params?: GetChatRequest) {
    return http.get(url("", params), { headers });
  },
  create(data: CreateChatRequest) {
    return http.post(url(""), { data, headers });
  },
  delete(data: DeleteChatRequest) {
    return http.delete(url(""), { data, headers });
  },
  getUsers(id: number, params?: GetChatUsersRequest) {
    return http.get(url(`/${id}/users`, params), { headers });
  },
  getNewMessagesCount(id: number) {
    return http.get(url(`/new/${id}`), { headers });
  },
  setAvatar(data: SetChatAvatarRequest) {
    return http.put(url("/avatar"), { data, headers });
  },
  addUsers(data: UsersRequest) {
    return http.put(url("/users"), { data, headers });
  },
  deleteUsers(data: UsersRequest) {
    return http.delete(url("/users"), { data, headers });
  },
  getToken(id: number) {
    return http.post(url(`/token/${id}`), { headers });
  },
};
