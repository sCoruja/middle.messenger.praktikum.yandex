import { UserController } from "../../controllers/UserController";
import Component from "../../services/Component";
import Router from "../../services/Router";
import SignInPage from "../signin";

export class Logout extends Component {
  componentDidMount(): void {
    const uc = new UserController();
    const router = new Router("#app");
    uc.logout();
    router.go("/");
  }
  render(): Element {
    const signInPage = new SignInPage({});
    return signInPage.render();
  }
}
