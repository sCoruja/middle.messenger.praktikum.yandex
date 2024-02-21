import Component, { ComponentProps } from "../../services/Component";
import tpl from "./form.hbs";

export class Form extends Component {
  constructor(tagName = "form", props: ComponentProps) {
    super(tagName, {
      ...props,
      events: {
        submit(event: SubmitEvent) {
          event.preventDefault();
          props.onSubmit?.(event);
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
