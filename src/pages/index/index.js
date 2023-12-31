import tpl from "./index.hbs";
import "./error.css";
import Component from "../../services/Component";
import { Button } from "../../components/Button";

export class IndexPage extends Component {
  constructor(props) {
    super("main", {
      ...props,
      count: 0,
      value: "",
      clickHandler: () => {
        this.setProps({ ...this.props, count: this.props.count + 1 });
      },
      keyUpHandler: (e) => {
        this.setProps({ ...this.props, value: e.target.value });
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
