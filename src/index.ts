import { ChatPage } from "./pages/chat";
import { ErrorPage } from "./pages/error";
import { ProfilePage } from "./pages/profile";
import SignInPage from "./pages/signin";
import { SignUpPage } from "./pages/signup";

import styles from "./index.module.css";

import { registerComponent } from "./utils/registerComponent";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import Users from "./components/Users";
import UserPanel from "./components/UserPanel";
import { UserCard } from "./components/UserCard";
import Conversation from "./components/Conversation";
import { Form } from "./components/Form";
import { Message } from "./components/Message";
import Profile from "./components/Profile";
import { ProfileField } from "./components/ProfileField";

import { registerConcatHelper } from "./utils/concatHelper";
import { SettingsForm } from "./components/SettingsForm";
import ImageProfileField from "./components/ImageProfileField";
import { PasswordProfileField } from "./components/PasswordProfileField";
import { InputWithValidation } from "./components/InputWithValidation";
import Router from "./services/Router";
import { Modal } from "./components/Modal";
import { UserController } from "./controllers/UserController";
import { PasswordForm } from "./components/PasswordForm";
import { ImageForm } from "./components/ImageForm";
import { Link } from "./components/Link";
import { Logout } from "./pages/Logout";
import Messages from "./components/Messages";
import { CreateChatModal } from "./components/Users/CreateChatModal";

registerConcatHelper();
registerComponent("Button", Button, "button");
registerComponent("Input", Input, "input");
registerComponent("Link", Link);
registerComponent("InputWithValidation", InputWithValidation);
registerComponent("Users", Users, "aside");
registerComponent("CreateChatModal", CreateChatModal);

registerComponent("Conversation", Conversation, "main");
// registerComponent("AddUserModal", AddUserModal);
// registerComponent("ChatUsersModal", ChatUsersModal);
registerComponent("Form", Form, "form");
registerComponent("Message", Message, "li");
registerComponent("Messages", Messages, "ul");
registerComponent("Profile", Profile, "main");
registerComponent("ProfileField", ProfileField, "li");
registerComponent("ImageProfileField", ImageProfileField);
registerComponent("PasswordProfileField", PasswordProfileField);
registerComponent("UserCard", UserCard);
registerComponent("SettingsForm", SettingsForm);
registerComponent("PasswordForm", PasswordForm);
registerComponent("ImageForm", ImageForm);
registerComponent("UserPanel", UserPanel);
registerComponent("Modal", Modal);
document.querySelector("body")?.setAttribute("class", styles.body_theme_dark);

const userController = new UserController();
userController.user();

const router = new Router("#app");
router
  .use("/", SignInPage)
  .use("/signup", SignUpPage)
  .use("/logout", Logout)
  .use("/settings", ProfilePage)
  .use("/messenger", ChatPage)
  .use(/messenger\/(\d+)/, ChatPage)
  .use("/*", ErrorPage);
router.start();
