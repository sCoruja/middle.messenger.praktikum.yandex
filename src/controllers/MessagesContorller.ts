import Store from "../services/Store";
import { WSTransport, WSTransportEvents } from "../services/WSTransport";
import { Chats } from "../services/api/Chats";
import { ChatMessage } from "../services/api/types";

type MessageData = ChatMessage[] | ChatMessage;

export class MessagesController {
  private webSocket?: WSTransport;
  private chatId: number;
  private userId: number;
  constructor(userId: number, chatId: number) {
    this.chatId = chatId;
    this.userId = userId;
  }

  public start() {
    Chats.getToken(this.chatId).then((data) => {
      if (data.status === 200) {
        const token = JSON.parse(data.response).token;
        this.webSocket = new WSTransport(
          `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${token}`
        );
        this.webSocket.connect().then(
          () => {
            this.getOldMessages(0);
            this.webSocket!.on(
              WSTransportEvents.Message,
              this.onMessage.bind(this)
            );
          },
          (e) => {
            console.log("Connection failed", e);
          }
        );
      }
    });
  }
  public close() {
    this.webSocket?.close();
  }
  private getOldMessages(offset: number) {
    this.webSocket!.send({ content: offset, type: "get old" });
  }
  private onMessage(data: MessageData) {
    if (Array.isArray(data)) {
      const messages = (data as ChatMessage[]).map((message) => {
        return {
          ...message,
          isOwned: this.userId === message.user_id,
        };
      });
      Store.set("messenger.currentChat.messages", messages as ChatMessage[]);
    } else {
      const messages = Store.getState().messenger.currentChat.messages;
      (messages ?? []).unshift({
        ...data,
        isOwned: this.userId === data.user_id,
      } as ChatMessage);
      Store.set("messenger.currentChat.messages", messages as ChatMessage[]);
      console.log("first");
      console.log(Store.getState().messenger.currentChat.messages);
    }
  }
  public sendMessage(content: string) {
    this.webSocket?.send({ content, type: "message" });
  }
}
