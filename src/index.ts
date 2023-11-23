import { ChatPage } from "./pages/chat";
import { ErrorPage } from "./pages/error";
import { ProfilePage } from "./pages/profile";
import { SignInPage } from "./pages/signin";
import { SignUpPage } from "./pages/signup";
import "./index.css";
import { render } from "./utils/renderDOM";

import { Conversation } from "./components/Conversation";
import { Fieldset } from "./components/Fieldset";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { Message } from "./components/Message";
import { Profile } from "./components/Profile";
import { ProfileField } from "./components/ProfileField";
import { UserCard } from "./components/UserCard";
import { Users } from "./components/Users";

import { registerComponent } from "./utils/registerComponent";
import { Button } from "./components/Button";

registerComponent("Users", Users);
registerComponent("Conversation", Conversation);
registerComponent("Fieldset", Fieldset);
registerComponent("Form", Form);
registerComponent("Input", Input);
registerComponent("Message", Message);
registerComponent("Profile", Profile);
registerComponent("ProfileField", ProfileField);
registerComponent("UserCard", UserCard);
registerComponent("Button", Button);

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
    const errorPage = new ErrorPage({ code: 404 });
    render("#app", errorPage);
    break;
  }
}
