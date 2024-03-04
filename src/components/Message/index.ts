import Component, { ComponentProps } from "../../services/Component";
import styles from "./message.module.css";
import tpl from "./message.hbs";
import userImg1 from "../../../static/images/person1.png";
import userImg2 from "../../../static/images/person2.png";
import checkIcon from "../../../static/icons/check.svg";

export class Message extends Component {
  constructor(tagName = "li", props: ComponentProps) {
    const liClassName = !props.message.isOwned
      ? `${styles.main__message} ${styles.message}`
      : `${styles.main__message} ${styles.message} ${styles.message_me}`;
    const image = props.message.isOwned ? userImg1 : userImg2;
    const statusImage = checkIcon;
    super(tagName, {
      ...props.message,
      liClassName,
      styles,
      image,
      statusImage,
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
