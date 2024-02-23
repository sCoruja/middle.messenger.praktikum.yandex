import { ChatPage } from "./pages/chat";
import { ErrorPage } from "./pages/error";
import { ProfilePage } from "./pages/profile";
import { SignInPage } from "./pages/signin";
import { SignUpPage } from "./pages/signup";

import styles from "./index.module.css";

import { render } from "./utils/renderDOM";
import { registerComponent } from "./utils/registerComponent";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Users } from "./components/Users";
import { Conversation } from "./components/Conversation";
import { Form } from "./components/Form";
import { Message } from "./components/Message";
import { Profile } from "./components/Profile";
import { ProfileField } from "./components/ProfileField";
import { UserCard } from "./components/UserCard";

import { registerConcatHelper } from "./utils/concatHelper";
import { Modal } from "./components/Modal";
import { ImageProfileField } from "./components/ImageProfileField";
import { PasswordProfileField } from "./components/PasswordProfileField";

registerConcatHelper();
registerComponent("Button", Button, "button");
registerComponent("Input", Input, "input");
registerComponent("Users", Users, "aside");
registerComponent("Conversation", Conversation, "main");
registerComponent("Form", Form, "form");
registerComponent("Message", Message, "li");
registerComponent("Profile", Profile, "main");
registerComponent("ProfileField", ProfileField, "li");
registerComponent("ImageProfileField", ImageProfileField, "div");
registerComponent("PasswordProfileField", PasswordProfileField, "div");
registerComponent("UserCard", UserCard, "div");
registerComponent("Modal", Modal, "div");

// const indexPage = new IndexPage();
// render("#app", indexPage);
document.querySelector("body")?.setAttribute("class", styles.body_theme_dark);

const pathname = window.location.pathname.endsWith("/")
  ? window.location.pathname
  : window.location.pathname + "/";
switch (pathname) {
  case "/": {
    const root = document.getElementById("app");
    if (root)
      root.innerHTML = `
    <a href="/signup">Sign Up</a><br />
    <a href="/signin">Sign In</a><br />
    <a href="/profile">Profile page</a><br />
    <a href="/chat">Chat page</a><br />
    <a href="/fdssfdfds">404</a><br />`;
    break;
  }
  case "/signup/": {
    const signUpPage = new SignUpPage();
    render("#app", signUpPage);
    break;
  }
  case "/signin/": {
    const signInPage = new SignInPage();
    render("#app", signInPage);
    break;
  }
  case "/profile/": {
    const profilePage = new ProfilePage();
    render("#app", profilePage);
    break;
  }
  case "/chat/": {
    const chatPage = new ChatPage();
    render("#app", chatPage);
    break;
  }
  default: {
    const errorPage = new ErrorPage("main", { code: 404 });
    render("#app", errorPage);
    break;
  }
}
