import Component from "../../services/Component";
import styles from "./chat.module.css";
import tpl from "./chat.hbs";
import { users, conversation } from "../../utils/fakeData";
export class ChatPage extends Component {
  constructor(tagName = "div") {
    super(tagName, { users, conversation, styles });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
