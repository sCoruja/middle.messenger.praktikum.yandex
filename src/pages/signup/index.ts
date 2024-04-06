import tpl from "./signup.hbs";
import styles from "../signin/signin.module.css";
import Component from "../../services/Component";
import { signUpFormValidators } from "./validate";
import { UserController } from "../../controllers/UserController";
import { Auth } from "../../services/api/Auth";

interface SignUpPageProps {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  errors: {
    first_name: string[];
    second_name: string[];
    login: string[];
    email: string[];
    phone: string[];
    password: string[];
    confirm_password: string[];
  };
  hasErrors: false;
}

export class SignUpPage extends Component {
  constructor(props = {}, tagName = "main") {
    super(
      {
        ...props,
        styles,
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        errors: {
          first_name: [],
          second_name: [],
          login: [],
          email: [],
          phone: [],
          password: [],
          confirm_password: [],
        },
        hasErrors: false,
      },
      tagName
    );
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const errors: { [key: string]: string[] } = {
      first_name: [],
      second_name: [],
      login: [],
      email: [],
      phone: [],
      password: [],
      confirm_password: [],
    };
    let hasErrors = false;
    Object.keys(signUpFormValidators).forEach((key) => {
      signUpFormValidators[key].forEach((validator) => {
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
      userController.signup({
        first_name: this.props.first_name,
        second_name: this.props.second_name,
        login: this.props.login,
        email: this.props.email,
        phone: this.props.phone,
        password: this.props.password,
      });
    }
  }
  changeHandler(event: InputEvent) {
    const name: string = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    const errors: string[] = [];
    signUpFormValidators[name].forEach((validator) => {
      if (name === "confirm_password") {
        if (
          !validator.validate(this.props.password, this.props.confirm_password)
        ) {
          errors.push(validator.errorMessage);
        }
      } else {
        if (!validator.validate(value)) errors.push(validator.errorMessage);
      }
    });
    this.setProps({
      ...this.props,
      [name]: value,
      errors: { ...this.props.errors, [name]: errors },
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      submitHandler: this.submitHandler.bind(this),
      changeHandler: this.changeHandler.bind(this),
    });
  }
}
