import Router from "../services/Router";
import Store from "../services/Store";
import { Chats } from "../services/api/Chats";
import { Users } from "../services/api/Users";
import { SetChatAvatarRequest, UsersRequest } from "../services/api/types";

export class MessengerController {
  getChats() {
    Chats.get().then((data) => {
      Store.set("messenger.chats", JSON.parse(data.response));
    }).catch(() => { console.log('Something went wrong when loading chat list') });
  }
  getChatInfo(id: number) {
    if (!id) return;
    const chats = Store.getState().messenger.chats;
    const currentChat = chats?.find((chat) => chat.id == id);
    if (currentChat) Store.set("messenger.currentChat.chat", currentChat);
    if (id)
      Chats.getUsers(id).then((data) => {
        Store.set("messenger.currentChat.users", JSON.parse(data.response));
      }).catch(() => { console.log('Something went wrong when loading chat data') });
  }
  findUser(login: string) {
    Users.search({ login }).then((data) => {
      if (data.status === 200) {
        Store.set("messenger.searchResult", JSON.parse(data.response));
      }
    }).catch(() => { console.log('Something went wrong when finding a user') });
  }
  addUser(requestData: UsersRequest) {
    Chats.addUsers(requestData).then((data) => {
      if (data.status === 200)
        console.log('ok');
    }).catch(() => { console.log('Something went wrong when adding the user to chat') });
  }
  deleteUser(requestData: UsersRequest) {
    Chats.deleteUsers(requestData).then((data) => {
      if (data.status === 200)
        console.log('ok');
    }).catch(() => { console.log('Something went wrong when adding the user to chat') });
  }
  createChat(title: string) {
    Chats.create({ title }).then((data) => {
      if (data.status === 200) {
        new Router("#app").go(`/messenger/${JSON.parse(data.response).id}`);
      }
    }).catch(() => { console.log('Something went wrong when creating a chat') });
  }
  deleteChat(chatId: number) {
    Chats.delete({ chatId }).then((data) => {
      if (data.status === 200) {
        new Router('#app').go('/messenger')
      }
    }).catch(() => { console.log('Something went wrong when deleting a chat') });
  }
  updateAvatar(requestData: FormData, chatId: number) {
    Chats.setAvatar(requestData).then((data) => {
      if (data.status === 200) {
        new Router('#app').go(`/messenger/${chatId}`)
      }
    }).catch(() => { console.log('Something went wrong when changing user avatar'); });
  }
}
