import Component, { ComponentProps } from "../../services/Component";
import tpl from "./inputWithValidation.hbs";

interface InputWithValidationProps {
  className: string;
  htmlType: string;
  name: string;
  value: string;
  onKeyUp: (e: KeyboardEvent) => void;
  placeholder: string;
  errors: string[];
  errorsClassName: string;
}

export class InputWithValidation extends Component {
  blurHandler(e: InputEvent) {
    this.props.onKeyUp(e);
  }
  render(): Element {
    return this.compile(tpl, {
      ...this.props,
      blurHandler: this.blurHandler.bind(this),
    });
  }
}
