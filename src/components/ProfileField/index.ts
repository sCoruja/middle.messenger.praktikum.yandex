import Component from "../../services/Component";
import styles from "./profileField.module.css";
import tpl from "./profileField.hbs";
import { UserResponse } from "../../services/api/types";
import { InputValidator } from "../Profile/validate";

interface ProfileFieldProps {
  isModalShown: boolean;
  events: {
    click: () => void;
    keyup: (e: KeyboardEvent) => void;
  };
  data: {
    name: string;
    title: string;
    validator: InputValidator;
  };
  modalOpenHandler: () => void;
  modalCloseHandler: () => void;
  user: UserResponse;
  validator: InputValidator;
}

export class ProfileField extends Component {
  constructor(props: ProfileFieldProps) {
    super({
      ...props,
      styles,
      isModalShown: false,
      events: {
        click: () => {
          if (!this.props.isModalShown) this.props.modalOpenHandler();
        },
        keyup: (e: KeyboardEvent) => {
          if (e.key === "Escape") this.props.modalCloseHandler();
        },
      },
      modalOpenHandler: () => {
        if (!this.props.isModalShown)
          this.setProps({
            ...this.props,
            isModalShown: true,
          });
      },
      modalCloseHandler: () => {
        if (this.props.isModalShown)
          this.setProps({
            ...this.props,
            isModalShown: false,
          });
      },
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      value: this.props.user?.[this.props.data.name],
    });
  }
}
