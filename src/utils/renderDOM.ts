import Component from "../services/Component";

export function render(query: string, block: Component) {
  const root = document.querySelector(query) as Element;
  // Можно завязаться на реализации вашего класса Block
  if (root) {
    // root.innerHTML = "";
    root.append(block.getContent()!);
  }
}
