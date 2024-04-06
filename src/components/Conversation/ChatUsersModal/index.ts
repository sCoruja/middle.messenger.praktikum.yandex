import tpl from "./chatUsersModal.hbs";
import styles from "./chatUsersModal.module.css";
import Component from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { withChatUsers } from "../../../hocs/connect";

interface ChatUsersModalProps {
  onClose: () => void;
  isModalShown: boolean;
  value: string;
  img: string;
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

class ChatUsersModal extends Component {
  constructor(props: ChatUsersModalProps) {
    super({
      ...props,
      img,
      styles,
      events: {
        keyup: (e: KeyboardEvent) => {
          if (e.key === "Escape") this.props.onClose();
        },
        click: (e: MouseEvent) => {
          if (e.target === e.currentTarget) this.props.onClose();
        },
      },
    });
  }

  changeHandler(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.setProps({
      ...this.props,
      value,
    });
  }
  submitHandler(event: SubmitEvent) {
    console.log(new FormData(event.target as HTMLFormElement));
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
    });
  }
}
export default withChatUsers(ChatUsersModal);
