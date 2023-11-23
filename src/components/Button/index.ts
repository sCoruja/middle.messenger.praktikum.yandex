import tpl from "./button.hbs";
import "./button.css";
import { Component } from "../../services/Component";
// import { InputPropsType } from "./types";

export class Button extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
