import Component, { ComponentProps } from "../../services/Component";
import { UsersProps } from "./types";
import "./users.css";
import tpl from "./users.hbs";

export class Users extends Component {
  constructor(tagName = "aside", props: ComponentProps) {
    const { users } = props as UsersProps;
    super(tagName, { ...props, users });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
