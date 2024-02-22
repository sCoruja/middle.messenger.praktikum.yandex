import tpl from "./signin.hbs";
import styles from "./signin.module.css";
import Component from "../../services/Component";
import { signInFormValidators } from "./validate";
export class SignInPage extends Component {
  constructor(tagName = 'main') {
    super(tagName, { styles, login: '', password: '' });
  }
  componentDidMount(): void {
    this.setProps({ login: "", password: "" });
  }
  private regExp = {
    login: "[a-zA-ZА-Яа-я0-9_-]{3,20}",
    password:
      "^(?=^.{8,40}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
  };
  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    //check valid
    if (event.target) {
      const data = new FormData(form);
    }
    console.log({ login: form.login.value, password: form.password.value });
  }
  changeHandler(event: InputEvent) {
    const name = (event.target as HTMLInputElement).name
    const value = (event.target as HTMLInputElement).value
    signInFormValidators[name].forEach(validator => {
      if (!validator.validate(value))
        console.log(validator.errorMessage)
    })
    this.setProps({
      ...this.props,
      [name]: (
        event.target as HTMLInputElement
      ).value,
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
