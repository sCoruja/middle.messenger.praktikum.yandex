import Component, { ComponentProps } from "../../services/Component";
import styles from "./chat.module.css";
import tpl from "./chat.hbs";
import { MessengerController } from "../../controllers/MessengerController";

interface ChatPageProps {
  pathname: string;
  chatId: number;
}

export class ChatPage extends Component {
  messengerController?: MessengerController;
  constructor(props: ChatPageProps) {
    const [, id] = props.pathname.match(/\/messenger\/(\d+)/) ?? [, 0];

    super({ styles, chatId: id });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
