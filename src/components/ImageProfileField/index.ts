import Component from "../../services/Component";
import styles from "./imageProfileField.module.css";
import tpl from "./imageProfileField.hbs";
import { withUser } from "../../hocs/connect";

interface ImageProfileFieldProps {
  image: string;
  isModalShown: boolean;
  events: {
    click: () => void;
  };
  modalOpenHandler: () => void;
}

class ImageProfileField extends Component {
  constructor(props: ImageProfileFieldProps, tagName = "div") {
    super(
      {
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
      },
      tagName
    );
  }
  render() {
    return this.compile(tpl, this.props);
  }
}

export default withUser(ImageProfileField);
