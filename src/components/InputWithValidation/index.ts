import Component, { ComponentProps } from "../../services/Component";
import tpl from "./inputWithValidation.hbs";

export class InputWithValidation extends Component {
  constructor(tagName = "div", props: ComponentProps) {
    super(tagName, { ...props });
  }
  blurHandler(e) {
    this.props.onKeyUp(e);
  }
  render(): Element {
    return this.compile(tpl, {
      ...this.props,
      blurHandler: this.blurHandler.bind(this),
    });
  }
}
