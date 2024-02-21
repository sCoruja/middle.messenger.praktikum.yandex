import Component from "../services/Component";

export function render(query: string, block: Component) {
  const root = document.querySelector(query) as Element & { v: any };
  // Можно завязаться на реализации вашего класса Block
  if (root) {
    root.append(block.getContent()!);
  }
}
