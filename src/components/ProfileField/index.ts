import Component, { ComponentProps } from "../../services/Component";
import styles from "./profileField.module.css";
import tpl from "./profileField.hbs";
export class ProfileField extends Component {
  constructor(tagName = "div", props: ComponentProps) {
    super(tagName, {
      ...props,
      styles,
      isModalShown: false,
      events: {
        click: (e: MouseEvent) => {
          if (!this.props.isModalShown) this.props.modalOpenHandler();
        },
      },
      modalOpenHandler: () => {
        if (!this.props.isModalShown)
          this.setProps({
            ...this.props,
            isModalShown: true,
          });
      },
      modalCloseHandler: () => {
        if (this.props.isModalShown)
          this.setProps({
            ...this.props,
            isModalShown: false,
          });
      },
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
