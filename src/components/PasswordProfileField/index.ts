import Component from "../../services/Component";
import styles from "./passwordProfileField.module.css";
import tpl from "./passwordProfileField.hbs";
export class PasswordProfileField extends Component {
  constructor(tagName = "div", props: any) {
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