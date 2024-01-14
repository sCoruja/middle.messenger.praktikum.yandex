import Component, { ComponentProps } from "../../services/Component";
import tpl from "./form.hbs";
import "./form.css";
export class Form extends Component {
  constructor(tagName = "form", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        submit(event: SubmitEvent) {
          if (props.onSubmit) props.onSubmit(event);
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
