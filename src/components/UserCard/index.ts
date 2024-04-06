import Component from "../../services/Component";
import styles from "./userCard.module.css";
import tpl from "./userCard.hbs";
import { toLastMessageDate } from "../../utils/convertDate";
import Router from "../../services/Router";
import { ChatsResponse } from "../../services/api/types";

interface UserCardProps {
  chat: ChatsResponse;
  events: {
    click: () => void;
  };
}

export class UserCard extends Component {
  constructor(props: UserCardProps) {
    super({
      ...props,
      events: {
        click() {
          const router = new Router("#app");
          router.go(`/messenger/${props.chat.id}`);
        },
      },
    });
  }
  render() {
    const date = toLastMessageDate(this.props.chat.last_message?.time ?? "");
    return this.compile(tpl, { ...this.props, styles, date });
  }
}
