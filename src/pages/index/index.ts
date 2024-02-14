import tpl from "./index.hbs";
import "./index.css";
import Component from "../../services/Component";
import { compile } from "handlebars";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export class IndexPage extends Component {
  constructor() {
    const btn = new Button({
      children: "Click!",
      events: {
        click: (ev) => {
          this.setProps({ ...this.props, count: this.props.count + 1 });
        },
      },
    });
    const inp = new Input({});
    super("div", { btn, inp, count: 0 });
  }
  render() {
    return this.compile(tpl, this.props);
    // return compile(tpl, this.props);
  }
}
