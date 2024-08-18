import Component from "../../services/Component";
import styles from "./message.module.css";
import tpl from "./message.hbs";
import userImg1 from "../../../static/images/person1.png";
import userImg2 from "../../../static/images/person2.png";
import checkIcon from "../../../static/icons/check.svg";
import { toChatMessageDate } from "../../utils/convertDate";
import { ChatMessage } from "../../services/api/types";

interface MessageProps {
  message: ChatMessage;
  className: string;
  image: string;
  statusImage: string;
  time: string;
}

export class Message extends Component {
  constructor(props: MessageProps, tagName = "li") {
    const className = !props.message.isOwned
      ? `${styles.main__message} ${styles.message}`
      : `${styles.main__message} ${styles.message} ${styles.message_me}`;
    const image = props.message.isOwned ? userImg1 : userImg2;
    const statusImage = checkIcon;
    super(
      {
        ...props,
        className,
        styles,
        image,
        statusImage,
        time: toChatMessageDate(props.message.time),
      },
      tagName
    );
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
