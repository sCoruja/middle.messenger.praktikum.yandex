import tpl from "./button.hbs";
import Component, { ComponentProps } from "../../services/Component";

export class Button extends Component {
  constructor(tagName: "button", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        click(e: MouseEvent) {
          props.onClick?.(e);
        },
      },
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
