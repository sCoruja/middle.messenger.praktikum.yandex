import { MessageProps } from "../Message/types"

export type ConversationProps = {
    messages: MessageProps[];
    username: string;
    avatar: string;
    // message:string;
    // attachments:???
}