import tpl from "./passwordForm.hbs";
import styles from "./passwordForm.module.css";
import Component from "../../services/Component";
import { InputValidator } from "../Profile/validate";
import { UserController } from "../../controllers/UserController";

interface PasswordFormProps {
  form: { oldPassword: string; newPassword: string };
  errors: { oldPassword: string[]; newPassword: string[] };
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
}

export class PasswordForm extends Component {
  constructor(props: PasswordFormProps) {
    super({
      ...props,
      styles,
      form: { oldPassword: "", newPassword: "" },
      errors: { oldPassword: [], newPassword: [] },
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
    const name = (event.target as HTMLInputElement).name;
    const errors: string[] = [];
    this.props.validator.forEach((validator: InputValidator) => {
      if (!validator.validate(value)) errors.push(validator.errorMessage);
    });
    this.setProps({
      ...this.props,
      errors: { ...this.props.errors, [name]: errors },
      form: { ...this.props.form, [name]: value },
    });
  }
  submitHandler(event: SubmitEvent) {
    const userController = new UserController();
    userController.changePassword({
      oldPassword: (event.target as HTMLFormElement).oldPassword.value,
      newPassword: (event.target as HTMLFormElement).newPassword.value,
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
    });
  }
}
