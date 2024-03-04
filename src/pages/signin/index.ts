import tpl from "./signin.hbs";
import styles from "./signin.module.css";
import Component from "../../services/Component";
import { signInFormValidators } from "./validate";
export class SignInPage extends Component {
  constructor(tagName = "main") {
    super(tagName, {
      styles,
      login: "",
      password: "",
      errors: { login: [], password: [] },
      hasErrors: false,
    });
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
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
      const data = new FormData(form);
      console.log(data);
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
  render() {
    return this.compile(tpl, {
      ...this.props,
      submitHandler: this.submitHandler.bind(this),
      changeHandler: this.changeHandler.bind(this),
    });
  }
}
