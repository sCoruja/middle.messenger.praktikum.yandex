import tpl from "./error.hbs";
import "./error.css";
import Component from "../../services/Component";

interface ErrorPageProps {
  code: number;
}

export class ErrorPage extends Component {
  componentDidMount(): void {}
  render() {
    const { code = 404 } = this.props as ErrorPageProps;
    return this.compile(tpl, { ...this.props, code });
  }
}
