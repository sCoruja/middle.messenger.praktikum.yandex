import tpl from "./input.hbs";
import "./input.css";
import Component, { ComponentProps } from "../../services/Component";
// import { InputPropsType } from "./types";

export class Input extends Component {
  constructor(tagName = "input", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        keyup(e: KeyboardEvent) {
          props.onKeyUp(e);
        },
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
