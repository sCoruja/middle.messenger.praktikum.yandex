import tpl from "./profile.hbs";
import styles from "./profile.module.css";
import Component from "../../services/Component";
import { users } from "../../utils/fakeData";
export class ProfilePage extends Component {
  constructor(tagName = "div") {
    super(tagName, { users, styles });
  }
  render() {
    return this.compile(tpl, this.props);
  }
}
