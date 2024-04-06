import tpl from "./addUserModal.hbs";
import styles from "./addUserModal.module.css";
import Component, { ComponentProps } from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { UserResponse } from "../../../services/api/types";
import { withSearchResult } from "../../../hocs/connect";
import { MessengerController } from "../../../controllers/MessengerController";

interface AddUserModalProps {
  onClose: () => void;
  isModalShown: boolean;
  value: string;
  searchResult?: UserResponse[];
  img: string;
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

class AddUserModal extends Component {
  constructor(props: AddUserModalProps) {
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
      messengerController.findUser(this.props.value);
    }
  }
  addHandler(event: MouseEvent) {
    console.log(this.props.chatId, (event.target as HTMLButtonElement).id);
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}

export default withSearchResult(AddUserModal);
