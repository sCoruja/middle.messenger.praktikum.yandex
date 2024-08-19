import Component from "../../services/Component";
import styles from "./userPanel.module.css";
import tpl from "./userPanel.hbs";
import { withUser } from "../../hocs/connect";
import { UserResponse } from "../../services/api/types";

interface UserPanelProps {
  user: UserResponse;
  isAuthorized: boolean;
  className: string;
}

class UserPanel extends Component {
  constructor(props: UserPanelProps) {
    super(props);
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      styles,
    });
  }
}

export default withUser(UserPanel);
