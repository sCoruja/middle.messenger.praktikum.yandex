import Handlebars from "handlebars";
import { HelperOptions } from "handlebars";
import Component from "../services/Component";

export function registerComponent(name, Block) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(name, function (options) {
    const component = new Block(options.hash);
    const dataAttribute = `data-id="${component.id}"`;
    (options.data.root.__children = options.data.root.__children || []).push({
      component,
      embed(fragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }
        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent());

        // if (component.props.events) {
        //   const { events = {} } = component.props;

        //   Object.keys(events).forEach((eventName) => {
        //     component.element.addEventListener(eventName, events[eventName]);
        //   });
        // }
      },
    });
    const contents = options.fn ? options.fn(this) : "";
    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
