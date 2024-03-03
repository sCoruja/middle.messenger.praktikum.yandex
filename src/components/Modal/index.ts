import tpl from "./modal.hbs";
import styles from "./modal.module.css";
import Component, { ComponentProps } from "../../services/Component";
import { InputValidator } from "../Profile/validate";

export class Modal extends Component {
  constructor(tagName = "div", props: ComponentProps) {
    super(tagName, {
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
      errors: [],
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
    console.log(new FormData(event.target));
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      changeHandler: this.changeHandler.bind(this),
      submitHandler: this.submitHandler.bind(this),
    });
  }
}
