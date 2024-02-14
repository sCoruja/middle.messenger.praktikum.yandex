import tpl from "./input.hbs";
import "./input.css";
import Component from "../../services/Component";
// import { InputPropsType } from "./types";

export class Input extends Component {
  constructor(props) {
    // Создаём враппер DOM-элемент button
    super("input", props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    return this.compile(tpl, this.props);
  }
}
