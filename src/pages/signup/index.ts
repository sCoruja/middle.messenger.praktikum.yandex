import tpl from "./signup.hbs";
import "./signup.css";
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
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          console.log("object");
        },
      },
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
