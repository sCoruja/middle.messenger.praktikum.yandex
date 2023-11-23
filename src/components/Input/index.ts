import tpl from "./input.hbs";
import "./input.css";
import { Component } from "../../services/Component";
import { InputPropsType } from "./types";

export class Input extends Component {
  constructor(props: InputPropsType) {
    super({
      ...props,
      isValid: true,
      events: {
        'blur': props.onBlur,
        'keyup': props.onKeyUp
      },
    });
  }
  //   handleChange(event: InputEvent) {}
  //   componentDidMount() {
  //     const inputElement: HTMLInputElement = this.element
  //       ? this.element.getElementsByClassName("input__input")
  //       : document.createElement("input");
  //     inputElement.addEventListener("change", this.handleChange);
  //   }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
