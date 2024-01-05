import tpl from "./error.hbs";
import "./error.css";
import Component from "../../services/Component";

export class ErrorPage extends Component {
  render() {
    return this.compile(tpl, this.props);
  }
}
