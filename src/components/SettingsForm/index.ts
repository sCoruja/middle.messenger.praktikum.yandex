import tpl from "./settingsForm.hbs";
import styles from "./settingsForm.module.css";
import Component from "../../services/Component";
import { InputValidator } from "../Profile/validate";
import { UserController } from "../../controllers/UserController";

interface SettingsFormProps {
  title: string;
  name: string;
  value: string;
  isModalShown: boolean;
  onClose: () => void;
  validator: InputValidator[];
}

export class SettingsForm extends Component {
  constructor(props: SettingsFormProps) {
    super({
      ...props,
      styles,
      errors: [],
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
    const errors: string[] = [];
    this.props.validator.forEach((validator: InputValidator) => {
      if (!validator.validate(value)) errors.push(validator.errorMessage);
    });
    this.setProps({
      ...this.props,
      errors,
      value,
    });
  }
  submitHandler(event: SubmitEvent) {
    const userController = new UserController();
    userController.changeProfile({ [this.props.name]: this.props.value });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
    });
  }
}
