import Component, { ComponentProps } from "../../services/Component";
import styles from "./conversation.module.css";
import tpl from "./conversation.hbs";
import attachIcon from "../../../static/images/attach.png";
export class Conversation extends Component {
  constructor(tagName = "main", props: ComponentProps) {
    super(tagName, { ...props, styles });
  }
  render() {
    return this.compile(tpl, { ...this.props, attachIcon });
  }
}
