import tpl from "./index.hbs";
import "./error.css";
import Component from "../../services/Component";

export class IndexPage extends Component {
  constructor() {
    super("main", {
      count: 0,
      value: "",
      clickHandler: () => {
        this.setProps({ ...this.props, count: this.props.count + 1 });
      },
      keyUpHandler: (e: KeyboardEvent) => {
        this.setProps({
          ...this.props,
          value: (e.target as HTMLInputElement).value,
        });
        console.log(this.props.value);
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
