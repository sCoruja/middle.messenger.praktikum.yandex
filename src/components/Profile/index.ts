import styles from "./profile.module.css";
import tpl from "./profile.hbs";
import Component from "../../services/Component";
import image from "../../../static/images/person1.png";
import { profileFormValidators } from "./validate";

export class Profile extends Component {
  constructor(tagName = "main") {
    const fields = [
      {
        name: "first_name",
        title: "First name",
        value: "John",
        validator: profileFormValidators.first_name,
      },
      {
        name: "second_name",
        title: "Second name",
        value: "Smith",
        validator: profileFormValidators.second_name,
      },
      {
        name: "login",
        title: "Login",
        value: "jsmth23",
        validator: profileFormValidators.login,
      },
      {
        name: "email",
        title: "Email",
        value: "jsmth@ya.ru",
        validator: profileFormValidators.email,
      },
      {
        name: "phone",
        title: "Phone",
        value: "+78005553535",
        validator: profileFormValidators.phone,
      },
    ];
    super(tagName, {
      fields,
      styles,
      image,
      passwordValidator: profileFormValidators.password,
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
