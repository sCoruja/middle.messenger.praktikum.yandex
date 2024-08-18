import tpl from "./button.hbs";
import Component from "../../services/Component";

interface ButtonProps {
  events?: {
    click: (e: MouseEvent) => void;
  };
  onClick: (e: MouseEvent) => void;
  tagName?: string;
  htmlType?: string;
  id?: string;
  className?: string;
  text?: string;
}

export class Button extends Component {
  constructor(props: ButtonProps, tagName = "button") {
    super({
      ...props,
      events: {
        click(e: MouseEvent) {
          props.onClick?.(e);
        },
      },
      tagName,
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
