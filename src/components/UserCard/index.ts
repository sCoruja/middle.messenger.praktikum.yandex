import Component from "../../services/Component";
import styles from "./userCard.module.css";
import tpl from "./userCard.hbs";

export class UserCard extends Component {
  constructor(tagName = "li", props: any) {
    const { user } = props;
    super(tagName, {
      ...user,
      styles,
    });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
