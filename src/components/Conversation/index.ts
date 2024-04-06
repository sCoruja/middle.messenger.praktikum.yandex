import Component, { ComponentProps } from "../../services/Component";
import styles from "./conversation.module.css";
import tpl from "./conversation.hbs";
import attachIcon from "../../../static/images/attach.png";
import { withUser } from "../../hocs/connect";
import { MessengerController } from "../../controllers/MessengerController";
import { MessagesController } from "../../controllers/MessagesContorller";
import { UserResponse } from "../../services/api/types";
import Store from "../../services/Store";
import Handlebars from "handlebars";

interface ConversationProps {
  tagName: string;
  chatId: number;
  user: UserResponse;
  isAuthorized: boolean;
  isAddUserModalOpened: boolean;
  isChatUsersModalOpened: boolean;
  message: string;
}

export class Conversation extends Component {
  private messagesController?: MessagesController;
  private messengerController?: MessengerController;
  constructor(props: ConversationProps, tagName = "main") {
    super(
      {
        ...props,
        styles,
        isAddUserModalOpened: false,
        isChatUsersModalOpened: false,
        message: "",
        title: "",
      },
      tagName
    );
  }
  componentDidMount(): void {
    this.messengerController = new MessengerController();
    this.messengerController.getChatInfo(this.props.chatId);
    if (this.props.user?.id && !this.messagesController) {
      this.messagesController = new MessagesController(
        this.props.user.id,
        this.props.chatId
      );
      this.messagesController.start();
    }
  }
  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): true | undefined {
    if (!this.props.isAuthorized) return;
    if (this.props.user.id && !this.messagesController) {
      this.messagesController = new MessagesController(
        this.props.user.id,
        this.props.chatId
      );
      this.messagesController.start();

      return true;
    }
    return true;
  }
  addUserModalToggle() {
    this.setProps({
      ...this.props,
      isAddUserModalOpened: !this.props.isAddUserModalOpened,
    });
  }
  chatUsersModalToggle() {
    this.setProps({
      ...this.props,
      isChatUsersModalOpened: !this.props.isChatUsersModalOpened,
    });
  }
  changeHandler(event: InputEvent) {
    const message = (event.target as HTMLInputElement).value;
    if (message !== this.props.message)
      this.setProps({ ...this.props, message });
  }
  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.props.message)
      this.messagesController?.sendMessage(this.props.message);
    this.setProps({ ...this.props, message: "" });
  }
  componentWillUnmount(): void {
    this.messagesController?.close.call(this);
    Store.set("messenger.currentChat.messages", undefined);
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      attachIcon,
      addUserModalToggle: this.addUserModalToggle.bind(this),
      chatUsersModalToggle: this.chatUsersModalToggle.bind(this),
      changeHandler: this.changeHandler.bind(this),
      onSubmit: this.onSubmit.bind(this),
    });
  }
}

export default withUser(Conversation);
