import "./profile.css";
import tpl from "./profile.hbs";
import Component from "../../services/Component";

export class Profile extends Component {
  constructor(tagName = "main") {
    const fields = [
      {
        title: "First name",
        value: "John",
        regExp: "^[a-zA-ZА-ЯЁа-яё]{2,40}$",
      },
      {
        title: "Second name",
        value: "Smith",
        regExp: "[a-zA-ZА-ЯЁа-яё]{2,40}$",
      },
      {
        title: "Display name",
        value: "John S.",
        regExp: "[a-zA-ZА-ЯЁа-яёs]{2,80}$",
      },
      {
        title: "Login",
        value: "jsmth23",
        regExp: "^[a-zA-ZА-Яа-я0-9_-]{3,20}$",
      },
      {
        title: "Email",
        value: "jsmth@ya.ru",
        regExp: "([A-Za-z-0-9]*)+@([A-Za-z-0-9]*)(.([A-Za-z-0-9]+))+$",
      },
      {
        title: "Phone",
        value: "+78005553535",
        regExp: "^(+?d)([(s]?d{3}[)s]?)([-s]?d{2,3}){3}$",
      },
    ];
    // const pwdRegExps =
    //   "^(?=^.{8,40}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";

    super(tagName, { fields });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
