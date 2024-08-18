import Router from "../services/Router";
import Store from "../services/Store";
import { Auth } from "../services/api/Auth";
import { Users } from "../services/api/Users";
import {
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
  UserRequest,
} from "../services/api/types";

export class UserController {
  signup(data: SignUpRequest) {
    Auth.signup(data).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
        Store.set("user.isAuthorized", true);
        const router = new Router("#app");
        router.go("/messenger");
      }
    });
  }
  signin(formData: SignInRequest) {
    Auth.signin(formData).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
        Store.set("user.isAuthorized", true);
        const router = new Router("#app");
        router.go("/messenger");
      }
    });
  }
  logout() {
    Auth.logout().then((data) => {
      if (data.status === 200) {
        data;
      }
    });
  }
  user() {
    Auth.user()
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          const user = JSON.parse(data.responseText);
          Store.set("user.user", user);
          Store.set("user.isAuthorized", true);
        }
      })
      .catch((e) => console.log(e));
  }
  changeAvatar(formData: FormData) {
    Users.changeAvatar(formData).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
      }
    });
  }
  changePassword(data: ChangePasswordRequest) {
    Users.changePassword(data).then((data) => {
      if (data.status === 200) {
      }
    });
  }
  changeProfile(data: { [key: string]: string }) {
    Users.changeProfile(data).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
      }
    });
  }
}
