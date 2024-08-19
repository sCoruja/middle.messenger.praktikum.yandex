import { EventBus } from "./EventBus";
import { set } from "../utils/utils";
import {
  ChatMessage,
  ChatUserResponse,
  ChatsResponse,
  UserResponse,
} from "./api/types";
export enum StoreEvents {
  Updated = "updated",
}

export type Indexed<T = any> = {
  [key in string]: T;
};

export interface AppStore {
  user: { user?: UserResponse; isAuthorized: boolean };
  messenger: {
    chats?: ChatsResponse[];
    currentChat: {
      chat?: ChatsResponse;
      users?: ChatUserResponse[];
      messages?: ChatMessage[];
      token?: string;
    };
    searchResult?: UserResponse[];
  };
}

class Store extends EventBus {
  private state: AppStore = {
    user: { user: undefined, isAuthorized: false },
    messenger: {
      chats: undefined,
      currentChat: {
        chat: undefined,
        users: undefined,
        messages: undefined,
        token: undefined,
      },
      searchResult: undefined,
    },
  };
  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    if (this.listeners[StoreEvents.Updated]) this.emit(StoreEvents.Updated);
  }
}

export default new Store();
