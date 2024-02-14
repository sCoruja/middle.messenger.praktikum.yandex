import tpl from "./modal.hbs";
import styles from "./modal.module.css";
import Component, { ComponentProps } from "../../services/Component";
import Handlebars from "handlebars";

export class Modal extends Component {
  constructor(tagName = "div", props: ComponentProps) {
    super(tagName, {
      ...props,
      styles,
      events: {
        keyup: (e: KeyboardEvent) => {
          console.log("closed");
          if (e.key === "Escape") this.props.onClose();
        },
        click: (e: MouseEvent) => {
          this.props.onClose();
        },
      },
    });
  }
  render() {
    if (this.props.isModalShown) {
      console.log(this.props);
      return this.compile(tpl, {
        ...this.props,
      });
    } else {
      return this.compile(Handlebars.compile("<div></div>"));
    }
  }
}
