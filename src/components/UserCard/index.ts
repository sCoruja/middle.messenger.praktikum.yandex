import Component from "../../services/Component";
import "./userCard.css";
import tpl from "./userCard.hbs";

export class UserCard extends Component {
  constructor(tagName = "li", props: any) {
    const { user } = props;
    super(tagName, {
      ...user,
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
