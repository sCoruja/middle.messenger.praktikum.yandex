import Component, { ComponentProps } from "../../services/Component";
import tpl from "./form.hbs";

interface FormProps {
  events: {
    submit: (event: SubmitEvent) => void;
  };
  onSubmit: (event: SubmitEvent) => void;
  className: string;
  enctype: boolean;
}

export class Form extends Component {
  constructor(props: FormProps, tagName = "form") {
    super(
      {
        ...props,
        events: {
          submit(event: SubmitEvent) {
            event.preventDefault();
            props.onSubmit?.(event);
          },
        },
      },
      tagName
    );
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
