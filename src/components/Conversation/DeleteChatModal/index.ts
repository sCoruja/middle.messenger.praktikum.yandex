import tpl from "./deleteChatModal.hbs";
import styles from "./deleteChatModal.module.css";
import Component from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { MessengerController } from "../../../controllers/MessengerController";

interface DeleteChatModalProps {
  onClose: () => void;
  isModalShown: boolean;
  chatId: number;
  events?: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

class DeleteChatModal extends Component {
  constructor(props: DeleteChatModalProps) {
    super({
      ...props,
      img,
      styles,

      events: {
        keyup: (e: KeyboardEvent) => {
          if (e.key === "Escape") this.props.onClose();
        },
        click: (e: MouseEvent) => {
          if (e.target === e.currentTarget) {
            this.setProps({ ...this.props, isModalShown: false });
          }
        },
      },
    });
  }

  clickHandler() {
    const messengerController = new MessengerController();
    messengerController.deleteChat(this.props.chatId);
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      clickHandler: this.clickHandler.bind(this)
    });
  }
}

export default DeleteChatModal;
