import { compile } from "handlebars";
import { Component } from "../../services/Component";
import { ProfileFieldProps } from "../Profile/types";
import "./profileField.css";
import tpl from "./profileField.hbs";
export class ProfileField extends Component {
  render() {
    return this.compile(tpl, this.props.data);
  }
}
