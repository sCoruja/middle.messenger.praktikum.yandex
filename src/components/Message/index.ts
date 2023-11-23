import { Component } from "../../services/Component";
import "./message.css";
import tpl from "./message.hbs";
import { MessageProps } from "./types";

export class Message extends Component {
  constructor(props: any) {
    const isUserOwned = props.message.owner === "me";
    const liClassName = !isUserOwned
      ? "chat__message"
      : "chat__message chat__message_owner_me";
    super({ ...props.message, liClassName });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
