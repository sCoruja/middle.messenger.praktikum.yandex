import Component from "../services/Component";
import { createDOMNode, patch, recycleNode } from "../vdom/vdom";

export function render(query, block) {
  const root = document.querySelector(query);
  // Можно завязаться на реализации вашего класса Block
  if (root) {
    root.append(block.getContent());
    // const vNode = recycleNode(block._element);
    // const node = createDOMNode(vNode);
    // app.append(node);
    root.v = recycleNode(root);
  }
}
