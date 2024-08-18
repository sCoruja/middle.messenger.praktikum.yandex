import tpl from "./signin.hbs";
import styles from "./signin.module.css";
import Component from "../../services/Component";
import { signInFormValidators } from "./validate";
import { UserController } from "../../controllers/UserController";
import { withAuth } from "../../hocs/connect";
import Router from "../../services/Router";

interface SignInPageProps {
  isAuthorized: boolean;
  login: string;
  password: string;
  errors: { login: string[]; password: string[] };
  hasErrors: boolean;
}

class SignInPage extends Component {
  constructor(props: SignInPageProps, tagName = "main") {
    super(
      {
        ...props,
        styles,
        login: "",
        password: "",
        errors: { login: [], password: [] },
        hasErrors: false,
      },
      tagName
    );
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();

    let hasErrors = false;
    const errors: { [key: string]: string[] } = { login: [], password: [] };
    Object.keys(signInFormValidators).forEach((key) => {
      signInFormValidators[key].forEach((validator) => {
        if (!validator.validate(this.props[key])) {
          errors[key].push(validator.errorMessage);
          hasErrors = true;
        }
      });
    });

    if (hasErrors) {
      this.setProps({ ...this.props, errors, hasErrors });
      return;
    } else {
      this.setProps({ ...this.props, errors, hasErrors });

      const userController = new UserController();
      userController.signin({
        login: this.props.login,
        password: this.props.password,
      });
    }
  }
  changeHandler(event: InputEvent) {
    const name: string = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    const errors: string[] = [];
    signInFormValidators[name].forEach((validator) => {
      if (!validator.validate(value)) errors.push(validator.errorMessage);
    });
    this.setProps({
      ...this.props,
      [name]: value,
      errors: { ...this.props.errors, [name]: errors },
    });
  }
  componentDidMount(): void { }
  componentDidUpdate(): true | undefined {
    if (this.props.isAuthorized) {
      const router = new Router("#app");
      router.go("/messenger");
    }
    return true;
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      submitHandler: this.submitHandler.bind(this),
      changeHandler: this.changeHandler.bind(this),
    });
  }
}

export default withAuth(SignInPage);
