import tpl from "./profile.hbs";
import { Profile } from "../../components/Profile";
import { Users } from "../../components/Users";
import { Component } from "../../services/Component";
import { ComponentProps } from "../../services/types";

export class ProfilePage extends Component {
  constructor() {
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
    super({ users });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
