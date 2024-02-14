import Handlebars from "handlebars";
import { HelperOptions } from "handlebars";
import Component from "../services/Component";

export function registerComponent(
  name: string,
  Block: typeof Component,
  tagName: string
) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(
    name,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Block(tagName, hash);
      const dataAttribute = `data-id="${component.id}"`;
      (data.root.__children = data.root.__children || []).push({
        component,
        embed(fragment: Element) {
          const stub = fragment.querySelector(`[${dataAttribute}]`);
          if (!stub && stub.getAttribute("data-id") === dataAttribute) {
            return;
          }
          component.getContent()?.append(...Array.from(stub.childNodes));
          stub.replaceWith(component.getContent()!);
          return { stub, component };
        },
      });
      const contents = fn ? fn(this) : "";
      return `<div ${dataAttribute}>${contents}</div>`;
    }
  );
}
