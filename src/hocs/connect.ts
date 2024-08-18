import Component, { ComponentProps } from "../services/Component";
import Store, { AppStore, Indexed, StoreEvents } from "../services/Store";
import { isEqual } from "../utils/utils";

export function connect(mapStateToProps: (state: AppStore) => Indexed) {
  return function (Block: typeof Component) {
    // используем class expression
    return class extends Block {
      constructor(props: ComponentProps) {
        // сохраняем начальное состояние
        let state = { ...mapStateToProps(Store.getState()) };
        super({ ...props, ...state });

        // подписываемся на событие
        Store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(Store.getState());
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}

export const withUser = connect((state) => ({
  user: state.user.user,
  isAuthorized: state.user.isAuthorized,
  // messages: state.messenger.currentChat.messages,
}));

export const withChats = connect((state) => ({
  chats: state.messenger.chats,
}));
export const withMessages = connect((state) => ({
  // userId: state.user.user?.id,
  messages: state.messenger.currentChat.messages,
}));

export const withAuth = connect((state) => ({
  isAuthorized: state.user.isAuthorized,
}));

export const withChatUsers = connect((state) => ({
  userId: state.user.user?.id,
  users: state.messenger.currentChat.users,
}));

export const withSearchResult = connect((state) => ({
  // chatId: state.messenger.currentChat.chat?.id,
  searchResult: state.messenger.searchResult,
}));
