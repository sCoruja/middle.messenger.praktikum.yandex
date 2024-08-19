import Component from "../../services/Component";
import styles from "./passwordProfileField.module.css";
import tpl from "./passwordProfileField.hbs";

interface PasswordProfileFieldProps {
  isModalShown: boolean;
  events: {
    click: () => void;
  };
  modalOpenHandler: () => void;
  modalCloseHandler: () => void;
  onKeyUp: (e: KeyboardEvent) => void;
}

export class PasswordProfileField extends Component {
  constructor(props: PasswordProfileFieldProps) {
    super({
      ...props,
      styles,
      isModalShown: false,
      events: {
        click: () => {
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
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
