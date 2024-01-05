import Component from "../../services/Component";
import "./conversation.css";
import tpl from "./conversation.hbs";

export class Conversation extends Component {
  render() {
    return this.compile(tpl, this.props);
  }
}
