import tpl from "./updateAvatarModal.hbs";
import styles from "./updateAvatarModal.module.css";
import Component from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { MessengerController } from "../../../controllers/MessengerController";

interface UpdateAvatarModalProps {
  onClose: () => void;
  isModalShown: boolean;
  chatId: number;
  events?: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

class UpdateAvatarModal extends Component {
  constructor(props: UpdateAvatarModalProps) {
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
  changeHandler(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.setProps({
      ...this.props,
      value,
    });
  }

  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    const messengerController = new MessengerController();
    // console.log(new FormData(event.target as HTMLFormElement));
    messengerController.updateAvatar(new FormData(event.target as HTMLFormElement), this.props.chatId);
  }
  render() {
    return this.compile(tpl, {
      ...this.props, changeHandler: this.changeHandler.bind(this), submitHandler: this.submitHandler.bind(this)
    });
  }
}

export default UpdateAvatarModal;
