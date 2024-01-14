import tpl from "./signin.hbs";
import "./signin.css";
import Component from "../../services/Component";
export class SignInPage extends Component {
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
    console.log({ login: form.login.value, password: form.login.value });
  }
  changeHandler(event: InputEvent) {
    console.log("Page: " + (event.target as HTMLInputElement).value);
    this.setProps({
      ...this.props,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
      submitHandler: this.submitHandler.bind(this),
      changeHandler: this.changeHandler.bind(this),
      login: this.props.login,
      password: this.props.password,
    });
  }
}
