import tpl from "./input.hbs";
import Component, { ComponentProps } from "../../services/Component";

interface InputProps {
  placeholder: string;
  tabindex: string;
  htmlTypehtmlType: string;
  value: string;
  name: string;
  id: string;
  className: string;
  onKeyUp: (e: KeyboardEvent) => void;
  events: {
    blur: (e: KeyboardEvent) => void;
  };
}

export class Input extends Component {
  constructor(props: InputProps, tagName = "input") {
    super(
      {
        ...props,
        events: {
          blur(e: KeyboardEvent) {
            props.onKeyUp?.(e);
          },
        },
      },
      tagName
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
