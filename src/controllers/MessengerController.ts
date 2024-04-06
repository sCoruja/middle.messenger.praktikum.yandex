import Router from "../services/Router";
import Store from "../services/Store";
import { Chats } from "../services/api/Chats";
import { Users } from "../services/api/Users";

export class MessengerController {
  getChats() {
    Chats.get().then((data) => {
      Store.set("messenger.chats", JSON.parse(data.response));
    });
  }
  getChatInfo(id: number) {
    if (!id) return;
    const chats = Store.getState().messenger.chats;
    const currentChat = chats?.find((chat) => chat.id == id);
    if (currentChat) Store.set("messenger.currentChat.chat", currentChat);
    if (id)
      Chats.getUsers(id).then((data) => {
        Store.set("messenger.currentChat.users", JSON.parse(data.response));
      });
  }
  findUser(login: string) {
    Users.search({ login }).then((data) => {
      if (data.status === 200) {
        Store.set("messenger.searchResult", JSON.parse(data.response));
      }
    });
  }
  createChat(title: string) {
    Chats.create({ title }).then((data) => {
      if (data.status === 200) {
        new Router("#app").go(`/messenger/${JSON.parse(data.response).id}`);
      }
    });
  }
}
