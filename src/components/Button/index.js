import tpl from "./button.hbs";
import "./button.css";
import Component from "../../services/Component";
// import { InputPropsType } from "./types";

export class Button extends Component {
  constructor(props) {
    super("button", {
      ...props,
      events: {
        click(event) {
          props.onClick();
        },
      },
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
