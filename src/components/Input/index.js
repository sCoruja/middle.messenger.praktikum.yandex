import tpl from "./input.hbs";
import "./input.css";
import Component from "../../services/Component";
// import { InputPropsType } from "./types";

export class Input extends Component {
  constructor(props) {
    super("input", {
      ...props,
      events: {
        // change(e) {
        //   console.log("Input: value changed");
        //   props.onChange();
        // },
        keyup(e) {
          props.onKeyUp(e);
        },
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
