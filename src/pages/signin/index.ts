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
    //check valid
    if (event.target) {
      const data = new FormData(event.target as HTMLFormElement);
    }
  }
  changeHandler(event: InputEvent) {
    console.log((event.target as HTMLInputElement).value);
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
      submitHandler: this.submitHandler,
      changeHandler: this.changeHandler,
      login: this.props.login,
      password: this.props.password,
    });
  }
}
