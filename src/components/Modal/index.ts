import tpl from "./modal.hbs";
import styles from "./modal.module.css";
import Component, { ComponentProps } from "../../services/Component";

export class Modal extends Component {
  constructor(tagName = "div", props: ComponentProps) {
    super(tagName, {
      ...props,
      styles,
      events: {
        keyup: (e: KeyboardEvent) => {
          if (e.key === "Escape") this.props.onClose();
        },
        click: (e: MouseEvent) => {
          if(e.target === e.currentTarget)
          this.props.onClose();
        },
      },
    });
  }
  componentDidMount(): void {
    console.log(this.element)
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
