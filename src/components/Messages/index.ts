import Component from "../../services/Component";
import styles from "./messages.module.css";
import tpl from "./messages.hbs";
import { withMessages } from "../../hocs/connect";
import { ChatMessage } from "../../services/api/types";

interface MessagesProps {
  messages?: ChatMessage[];
  userId?: string;
  tagName?: string;
}

class Messages extends Component {
  constructor(props: MessagesProps, tagName = "ul") {
    super(
      {
        ...props,
        styles,
      },
      tagName
    );
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
export default withMessages(Messages);
