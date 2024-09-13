import Component from "../../services/Component";
import styles from "./conversation.module.css";
import tpl from "./conversation.hbs";
import attachIcon from "../../../static/images/attach.png";
import { withUser } from "../../hocs/connect";
import { MessengerController } from "../../controllers/MessengerController";
import { MessagesController } from "../../controllers/MessagesContorller";
import { UserResponse } from "../../services/api/types";
import Store from "../../services/Store";
import { Button } from "../Button";
import AddUserModal from "./AddUserModal";
import ChatUsersModal from "./ChatUsersModal";
import Messages from "../Messages";
import { MessageForm } from "./MessageForm";
import DeleteChatModal from "./DeleteChatModal";
import UpdateAvatarModal from "./UpdateAvatarModal";

interface ConversationProps {
  tagName: string;
  chatId: number;
  user: UserResponse;
  isAuthorized: boolean;
  isAddUserModalOpened: boolean;
  isChatUsersModalOpened: boolean;
  isDeleteChatModalOpened: boolean;
  isUpdateAvatarModalOpened: boolean;
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
        isDeleteChatModalOpened: false,
        isChatUsersModalOpened: false,
        isUpdateAvatarModalOpened: false,
        message: "",

        AddUserModalButton: new Button({
          htmlType: "button",
          className: styles["main__chat-button"],
          onClick: () => {
            this.addUserModalToggle();
            this.setProps({
              ...this.props,
              isAddUserModalOpened: !this.props.isAddUserModalOpened,
            });
          },
          text: ` <div
          class="${styles["main__chat-icon"]} ${styles["main__chat-icon_add"]}"
        ></div>`,
        }),
        ChatUsersModalButton: new Button({
          htmlType: "button",
          className: styles["main__chat-button"],
          onClick: () => {
            this.chatUsersModalToggle();
            this.setProps({
              ...this.props,
              isChatUsersModalOpened: !this.props.isChatUsersModalOpened,
            });
          },
          text: ` <div
          class="${styles["main__chat-icon"]} ${styles["main__chat-icon_users"]}"
        ></div>`,
        }),
        DeleteChatButton: new Button({
          htmlType: "button",
          className: styles["main__chat-button"],
          onClick: () => {
            this.deleteChatModalToggle();
            this.setProps({
              ...this.props,
              isDeleteChatModalOpened: !this.props.isDeleteChatModalOpened,
            });
          },
          text: ` <div
          class="${styles["main__chat-icon"]} ${styles["main__chat-icon_delete"]}"
        ></div>`,
        }),
        AddUserModal: new AddUserModal({
          isModalShown: props.isAddUserModalOpened, chatId: props.chatId,
          onClose: () => {
            this.addUserModalToggle();
          }
        }),
        DeleteChatModal: new DeleteChatModal({
          isModalShown: props.isDeleteChatModalOpened, chatId: props.chatId,
          onClose: () => {
            this.deleteChatModalToggle();
          }
        }),
        ChatUserModal: new ChatUsersModal({
          isModalShown: props.isChatUsersModalOpened, chatId: props.chatId,
          onClose: () => {
            this.chatUsersModalToggle();
          }
        }),
        UpdateAvatarModal: new UpdateAvatarModal({
          isModalShown: props.isUpdateAvatarModalOpened, chatId: props.chatId,
          onClose: () => {
            this.udpateAvatarModalToggle();
          }
        }),
        Messages: new Messages({}),
        MessageForm: new MessageForm({
          inputKeyUpHandler: () => { },
          onSubmit: (event) => {
            this.onSubmit.call(this, event);
          },
        }),
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
  componentDidUpdate(): true | undefined {
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
    this.children.AddUserModal.setProps({
      ...this.children.AddUserModal.props,
      isModalShown: !this.children.AddUserModal.props.isModalShown,
    });
  }
  deleteChatModalToggle() {
    this.children.DeleteChatModal.setProps({
      ...this.children.DeleteChatModal.props,
      isModalShown: !this.children.DeleteChatModal.props.isModalShown,
    });
  }
  chatUsersModalToggle() {
    this.children.ChatUserModal.setProps({
      ...this.children.ChatUserModal.props,
      isModalShown: !this.children.ChatUserModal.props.isModalShown,
    });
  }
  udpateAvatarModalToggle() {
    this.children.UpdateAvatarModal.setProps({
      ...this.children.UpdateAvatarModal.props,
      isModalShown: !this.children.UpdateAvatarModal.props.isModalShown,
    });
  }
  changeHandler(event: InputEvent) {
    const message = (event.target as HTMLInputElement).value;
    if (message !== this.props.message)
      this.setProps({ ...this.props, message });
  }
  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form.message.value)
      this.messagesController?.sendMessage(form.message.value);
    this.setProps({ ...this.props, message: "" });
    form.message.value = "";
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
      udpateAvatarModalToggle: this.udpateAvatarModalToggle.bind(this),
      AddUserModal: {
        ...this.props.AddUserModal,
        isModalShown: this.props.isAddUserModalOpened, chatId: this.props.chatId
      },
      onSubmit: this.onSubmit.bind(this),
    });
  }
}

export default withUser(Conversation);
