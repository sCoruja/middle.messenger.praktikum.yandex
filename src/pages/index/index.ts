import tpl from "./index.hbs";
import Component from "../../services/Component";
import styles from "./index.module.css";

export class IndexPage extends Component {
  constructor() {
    super("main", {
      count: 0,
      styles,
      value: "",
      clickHandler: () => {
        this.setProps({ ...this.props, count: this.props.count + 1 });
      },
      keyUpHandler: (e: KeyboardEvent) => {
        this.setProps({
          ...this.props,
          value: (e.target as HTMLInputElement).value,
        });
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
