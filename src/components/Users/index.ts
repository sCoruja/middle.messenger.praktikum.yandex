import { Component } from "../../services/Component";
import { UsersProps } from "./types";
import { UserCard } from "../UserCard";
import "./users.css";
import tpl from "./users.hbs";

export class Users extends Component {
  constructor(props: UsersProps) {
    const { users } = props as UsersProps;
    super({ ...props, users });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
