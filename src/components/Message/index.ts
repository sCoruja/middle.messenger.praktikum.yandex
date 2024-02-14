import Component from "../../services/Component";
import styles from "./message.module.css";
import tpl from "./message.hbs";
import userImg1 from "../../../static/images/person1.png";
import userImg2 from "../../../static/images/person2.png";
export class Message extends Component {
  constructor(tagName = "li", props: any) {
    const liClassName = !props.message.isOwned
      ? `${styles.main__message} ${styles.message}`
      : `${styles.main__message} ${styles.message} ${styles.message_me}`;
    const image = props.message.isOwned ? userImg1 : userImg2;
    super(tagName, { ...props.message, liClassName, styles, image });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
