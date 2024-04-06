import tpl from "./imageForm.hbs";
import styles from "./imageForm.module.css";
import Component, { ComponentProps } from "../../services/Component";
import { UserController } from "../../controllers/UserController";

interface ImageFormProps {
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
  onClose: () => void;
  isModalShown: boolean;
  submitHandler: (e: SubmitEvent) => void;
}

export class ImageForm extends Component {
  props: ImageFormProps;
  constructor(props: ImageFormProps) {
    super({
      ...props,
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
    event.preventDefault();
    const userController = new UserController();
    userController.changeAvatar(new FormData(event.target as HTMLFormElement));
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
    });
  }
}
