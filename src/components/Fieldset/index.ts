import tpl from "./fieldset.hbs";
import "./fieldset.css";
import { Component } from "../../services/Component";
import { FieldsetPropsType } from "./types";
import { ComponentProps } from "../../services/types";

export class Fieldset extends Component {
  componentDidMount(oldProps: ComponentProps): void {
    console.log(this.props.input);
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
