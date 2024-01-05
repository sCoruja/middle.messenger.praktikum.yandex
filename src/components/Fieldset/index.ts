import tpl from "./fieldset.hbs";
import "./fieldset.css";
import Component from "../../services/Component";

export class Fieldset extends Component {
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
