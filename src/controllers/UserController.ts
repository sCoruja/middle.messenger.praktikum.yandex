import Router from "../services/Router";
import Store from "../services/Store";
import { Auth } from "../services/api/Auth";
import { Users } from "../services/api/Users";
import {
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
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
    }).catch(() => { console.log('Something went wrong while signin up'); });
  }
  signin(formData: SignInRequest) {
    Auth.signin(formData).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
        Store.set("user.isAuthorized", true);
        const router = new Router("#app");
        router.go("/messenger");
      }
    }).catch(() => { console.log('Something went wrong while signin in'); });
  }
  logout() {
    Auth.logout().then((data) => {
      if (data.status === 200) {
        data;
      }
    }).catch(() => { console.log('Something went wrong while logging out'); });
  }
  user() {
    Auth.user()
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          const user = JSON.parse(data.responseText);
          Store.set("user.user", user);
          Store.set("user.isAuthorized", true);
        }
      }).catch(() => { console.log('Something went wrong when getting user info'); });
  }
  changeAvatar(formData: FormData) {
    Users.changeAvatar(formData).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
      }
    }).catch(() => { console.log('Something went wrong when changing user avatar'); });
  }
  changePassword(data: ChangePasswordRequest) {
    Users.changePassword(data).then((data) => {
      if (data.status === 200) {
      }
    }).catch(() => { console.log('Something went wrong when changing password'); });
  }
  changeProfile(data: { [key: string]: string }) {
    Users.changeProfile(data).then((data) => {
      if (data.status === 200) {
        Store.set("user.user", JSON.parse(data.response));
      }
    }).catch(() => { console.log('Something went wrong when changing user info'); });
  }
}
