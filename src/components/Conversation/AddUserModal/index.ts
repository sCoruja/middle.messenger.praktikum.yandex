import tpl from "./addUserModal.hbs";
import styles from "./addUserModal.module.css";
import Component from "../../../services/Component";
import img from "../../../../static/images/person3.png";
import { UserRequest, UserResponse, UsersRequest } from "../../../services/api/types";
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

  submitHandler() {
    if (this.props.value) {
      const messengerController = new MessengerController();
      messengerController.findUser(this.props.value);
    }
  }
  addHandler(event: MouseEvent) {
    console.log(this.props.chatId, (event.target as HTMLButtonElement).id);
    const userId = Number((event.target as HTMLButtonElement).id)
    const messengerController = new MessengerController();
    messengerController.addUser({ chatId: this.props.chatId, users: [userId] } as UsersRequest)
  }
  render() {
    return this.compile(tpl, {
      ...this.props, changeHandler: this.changeHandler.bind(this), submitHandler: this.submitHandler.bind(this), addHandler: this.addHandler.bind(this)
    });
  }
}

export default withSearchResult(AddUserModal);
