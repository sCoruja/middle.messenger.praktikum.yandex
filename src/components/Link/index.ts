import Component from "../../services/Component";
import Router from "../../services/Router";
import tpl from "./link.hbs";

interface LinkProps {
  to: string;
  className: string;
  events: {
    click: (event: MouseEvent) => void;
  };
}

export class Link extends Component {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click(event: Event) {
          event.preventDefault();
          new Router("#app").go(props.to);
        },
      },
    });
  }
  render(): Element {
    return this.compile(tpl, this.props);
  }
}
