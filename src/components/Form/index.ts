import Component, { ComponentProps } from "../../services/Component";
import tpl from "./form.hbs";
import "./form.css";
export class Form extends Component {
  constructor(tagName = "form", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
