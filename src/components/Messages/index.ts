import Component, { ComponentProps } from "../../services/Component";
import styles from "./messages.module.css";
import tpl from "./messages.hbs";
import { withMessages } from "../../hocs/connect";
import { ChatMessage } from "../../services/api/types";
import Store from "../../services/Store";
import { isEqual } from "../../utils/utils";

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
        messages: props.messages,
        styles,
      },
      tagName
    );
  }
  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): true | undefined {
    console.log("messages mounted");
    return true;
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
export default withMessages(Messages);
