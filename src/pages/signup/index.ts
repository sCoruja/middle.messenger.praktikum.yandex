import tpl from "./signup.hbs";
import styles from "../signin/signin.module.css";
import Component from "../../services/Component";
export class SignUpPage extends Component {
  private regExp = {
    first_name: "^[a-zA-ZА-ЯЁа-яё]{2,40}$",
    second_name: "^[a-zA-ZА-ЯЁа-яё]{2,40}$",
    login: "^[a-zA-ZА-Яа-я0-9_-]{3,20}$",
    email: "^([A-Za-z-0-9]*)+@([A-Za-z-0-9]*)(.([A-Za-z-0-9]+))+$",
    phone: `^[(+|\d)(\d)]{9,14}$`,
    password: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`,
    confirm_password: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$`,
  };
  constructor(tagName = "main") {
    super(tagName, {
      styles,
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    });
  }
  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    //check valid
    if (event.target) {
      const data = new FormData(form);
    }
    console.log({
      first_name: form.first_name.value,
      second_name: form.second_name.value,
      login: form.login.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      confirm_password: form.confirm_password.value,
    });
  }
  changeHandler(event: InputEvent) {
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
    });
  }
}
