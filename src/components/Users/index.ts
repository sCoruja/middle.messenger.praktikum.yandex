import Component, { ComponentProps } from "../../services/Component";
import { UsersProps } from "./types";
import styles from "./users.module.css";
import tpl from "./users.hbs";
import userImg from "../../../static/images/person1.png";
import profileBtn from "../../../static/icons/edit.svg";
import themeBtn from "../../../static/icons/light-mode.svg";
import leaveBtn from "../../../static/icons/leave.svg";
import searchIcon from "../../../static/icons/search.svg";

export class Users extends Component {
  constructor(tagName = "aside", props: ComponentProps) {
    const { users } = props as UsersProps;
    super(tagName, { ...props, users, styles });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      userImg,
      profileBtn,
      themeBtn,
      leaveBtn,
      searchIcon,
    });
  }
}
