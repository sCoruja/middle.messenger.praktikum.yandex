import { Component } from "../../services/Component";
import tpl from "./form.hbs";
import "./form.css";
import { ComponentProps } from "../../services/types";
export class Form extends Component {
  constructor(props: any) {
    const onSubmit = props.onSubmit;
    super({
      events: {
        submit: props.onSubmit,
      },
    });
  }
  componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ): boolean {
    return !(oldProps === newProps);
  }
  componentDidMount(oldProps: ComponentProps): void {
    console.log("1");
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }
}
