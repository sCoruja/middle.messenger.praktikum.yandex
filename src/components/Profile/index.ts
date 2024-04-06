import styles from "./profile.module.css";
import tpl from "./profile.hbs";
import Component from "../../services/Component";
import { InputValidator, profileFormValidators } from "./validate";
import { withUser } from "../../hocs/connect";
import { UserResponse } from "../../services/api/types";

interface ProfileProps {
  user: UserResponse;
  isAuthorized: boolean;
  fields: {
    name: string;
    title: string;
    validator: InputValidator;
  }[];
  passwordValidator: InputValidator;
}

class Profile extends Component {
  constructor(props: ProfileProps, tagName = "main") {
    const fields = [
      {
        name: "first_name",
        title: "First name",
        validator: profileFormValidators.first_name,
      },
      {
        name: "second_name",
        title: "Second name",
        validator: profileFormValidators.second_name,
      },
      {
        name: "login",
        title: "Login",
        validator: profileFormValidators.login,
      },
      {
        name: "email",
        title: "Email",
        validator: profileFormValidators.email,
      },
      {
        name: "phone",
        title: "Phone",
        validator: profileFormValidators.phone,
      },
    ];
    super(
      {
        ...props,
        fields,
        styles,
        passwordValidator: profileFormValidators.password,
      },
      tagName
    );
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}

export default withUser(Profile);
