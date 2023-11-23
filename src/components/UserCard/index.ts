import { Component } from "../../services/Component";
import "./userCard.css";
import tpl from "./userCard.hbs";

export class UserCard extends Component {
  constructor(props: any) {
    const { user } = props;
    super({
      ...user,
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
