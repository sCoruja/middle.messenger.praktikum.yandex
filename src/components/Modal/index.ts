import tpl from "./modal.hbs";
import styles from "./modal.module.css";
import Component from "../../services/Component";

interface ModalProps {
  isModalShown: boolean;
  events: {
    keyup: (e: KeyboardEvent) => void;
    click: (e: MouseEvent) => void;
  };
  onClose: () => void;
}

export class Modal extends Component {
  constructor(props: ModalProps) {
    super({
      ...props,
      styles,
      events: {
        keyup: (e: KeyboardEvent) => {
          if (e.key === "Escape") this.props.onClose();
        },
        click: (e: MouseEvent) => {
          if (e.target === e.currentTarget) this.props.onClose();
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
