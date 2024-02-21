import tpl from "./input.hbs";
import Component, { ComponentProps } from "../../services/Component";

export class Input extends Component {
  constructor(tagName = "input", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        blur(e: KeyboardEvent) {
          props.onKeyUp(e);
        },
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
