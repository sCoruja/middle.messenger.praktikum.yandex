import Component from "../../services/Component";
import styles from "./users.module.css";
import tpl from "./users.hbs";
import userImg from "../../../static/images/person1.png";
import profileBtn from "../../../static/icons/edit.svg";
import themeBtn from "../../../static/icons/light-mode.svg";
import leaveBtn from "../../../static/icons/leave.svg";
import searchIcon from "../../../static/icons/search.svg";
import { withChats } from "../../hocs/connect";
import { ChatsResponse } from "../../services/api/types";
import { MessengerController } from "../../controllers/MessengerController";

interface UsersProps {
  chats: ChatsResponse[];
}

class Users extends Component {
  messengerController?: MessengerController;
  constructor(props: UsersProps, tagName = "aside") {
    super({ ...props, styles, isCreateChatModalOpened: false }, tagName);
  }
  componentDidMount(): void {
    this.messengerController = new MessengerController();
    this.messengerController.getChats();
  }
  createChatModalToggle() {
    this.setProps({
      ...this.props,
      isCreateChatModalOpened: !this.props.isCreateChatModalOpened,
    });
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      userImg,
      profileBtn,
      themeBtn,
      leaveBtn,
      searchIcon,
      createChatModalToggle: this.createChatModalToggle.bind(this),
    });
  }
}
export default withChats(Users);
