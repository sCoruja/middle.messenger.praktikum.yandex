import tpl from "./messageForm.hbs";
import styles from "./messageForm.module.css";
import Component from "../../../services/Component";
import { Input } from "../../Input";

interface MessageFormProps {
  inputKeyUpHandler: () => void;
  onSubmit: (event: SubmitEvent) => void;
}

export class MessageForm extends Component {
  constructor(props: MessageFormProps) {
    super({
      ...props,
      styles,
      messageInputValue: "",
      events: {
        submit: (e: SubmitEvent) => {
          if (e.target === e.currentTarget) this.props.onSubmit(e);
        },
      },

      MessageInput: new Input({
        className: styles.main__msgInput,
        htmlType: "text",
        placeholder: "Type a message...",
        name: "message",
        onKeyUp: props.inputKeyUpHandler,
      }),
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
