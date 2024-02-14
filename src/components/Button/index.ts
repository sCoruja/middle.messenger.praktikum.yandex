import tpl from "./button.hbs";
import "./button.css";
import Component from "../../services/Component";
import { compile } from "handlebars";
// import { InputPropsType } from "./types";

export class Button extends Component {
  constructor(props) {
    // Создаём враппер DOM-элемент button
    super("button", props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    return this.compile(tpl, this.props);
  }
}
