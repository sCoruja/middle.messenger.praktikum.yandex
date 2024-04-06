import tpl from "./createChatModal.hbs";
import styles from "./createChatModal.module.css";
import Component, { ComponentProps } from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { MessengerController } from "../../../controllers/MessengerController";
import { Chats } from "../../../services/api/Chats";

interface CreateChatModalProps {
  onClose: () => void;
  isModalShown: boolean;
  value: string;
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

export class CreateChatModal extends Component {
  constructor(props: CreateChatModalProps) {
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
  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): true | undefined {
    return true;
  }
  submitHandler(event: SubmitEvent) {
    if (this.props.value) {
      const messengerController = new MessengerController();
      messengerController.createChat(this.props.value);
    }
  }
  addHandler(event: MouseEvent) {
    console.log(this.props.chatId, (event.target as HTMLButtonElement).id);
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
      addHandler: this.addHandler.bind(this),
    });
  }
}
