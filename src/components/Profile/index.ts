import styles from "./profile.module.css";
import tpl from "./profile.hbs";
import Component from "../../services/Component";
import image from "../../../static/images/person1.png";

export class Profile extends Component {
  constructor(tagName = "main") {
    const fields = [
      {
        title: "First name",
        value: "John",
      },
      {
        title: "Second name",
        value: "Smith",
      },
      {
        title: "Display name",
        value: "John S.",
      },
      {
        title: "Login",
        value: "jsmth23",
      },
      {
        title: "Email",
        value: "jsmth@ya.ru",
      },
      {
        title: "Phone",
        value: "+78005553535",
      },
    ];
    super(tagName, {
      fields,
      styles,
      image,
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
