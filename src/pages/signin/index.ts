import tpl from "./signin.hbs";
import "./signin.css";
import { Component } from "../../services/Component";
import { ComponentProps } from "../../services/types";
export class SignInPage extends Component {
  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount(oldProps: ComponentProps): void {
    this.setProps({ login: "", password: "" });
  }
  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): boolean {
    return !(oldProps === newProps);
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
      const data = new FormData(event.target);
    }
  }
  changeHandler(event: InputEvent) {
    console.log(event.target.value);
    this.setProps({ ...this.props, [event.target.name]: event.target.value });
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
