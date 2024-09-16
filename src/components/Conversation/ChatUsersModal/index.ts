import tpl from "./chatUsersModal.hbs";
import styles from "./chatUsersModal.module.css";
import Component from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { withChatUsers } from "../../../hocs/connect";
import { MessengerController } from "../../../controllers/MessengerController";
import { UsersRequest } from "../../../services/api/types";

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
          if (e.target === e.currentTarget)
            this.setProps({ ...this.props, isModalShown: false });
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
  deleteHandler(event: MouseEvent) {
    console.log(this.props.chatId, (event.target as HTMLButtonElement).id);
    const userId = Number((event.target as HTMLButtonElement).id)
    const messengerController = new MessengerController();
    messengerController.deleteUser({ chatId: this.props.chatId, users: [userId] } as UsersRequest)
    this.props.onClose();
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
      deleteHandler: this.deleteHandler.bind(this)
    });
  }
}
export default withChatUsers(ChatUsersModal);
