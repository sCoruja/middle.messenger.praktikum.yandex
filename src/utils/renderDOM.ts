import { Component } from "../services/Component";

export function render(query: string, block: Component) {
  const root = document.querySelector(query);
  // Можно завязаться на реализации вашего класса Block
  if (root) {
    root.innerHTML = "";
    root.append(block.getContent()!);

    block.dispatchComponentDidMount();

  }
}
