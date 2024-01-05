import Component from "../../services/Component";
import "./chat.css";
import tpl from "./chat.hbs";

export class ChatPage extends Component {
  constructor(tagName = "div") {
    const users = [
      {
        username: "Ann",
        lastMessage: "Hi!",
        newMessages: 2,
        avatar:
          "https://u-static.fotor.com/images/text-to-image/result/PRO-dc09549a25624b189b4f1c5e2473f2b3.jpg",
      },
      {
        username: "Jack",
        lastMessage: "ok!",
        avatar:
          "https://u-static.fotor.com/images/text-to-image/result/PRO-aa7bdf2ee000436b857f6bb5475d982c.jpg",
      },
    ];
    const conversation = {
      messages: [
        {
          owner: "mnjkn32r4gvbre234rtg",
          text: "How are you?",
          datetime: "11.12",
        },
        {
          owner: "me",
          text: "Fine!",
          datetime: "11.13",
          status: "sent",
        },
        {
          owner: "mnjkn32r4gvbre234rtg",
          text: "ok!",
          datetime: "11.22",
        },
      ],
      username: "Jack",
      avatar:
        "https://u-static.fotor.com/images/text-to-image/result/PRO-aa7bdf2ee000436b857f6bb5475d982c.jpg",
    };
    super(tagName, { users, conversation });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
