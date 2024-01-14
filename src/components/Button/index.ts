import tpl from "./button.hbs";
import "./button.css";
import Component, { ComponentProps } from "../../services/Component";
// import { InputPropsType } from "./types";

export class Button extends Component {
  constructor(tagName: "button", props: ComponentProps) {
    super("button", {
      ...props,
      events: {
        click(e: MouseEvent) {
          if (props.onClick) props.onClick(e);
        },
      },
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
