import  Component  from "../services/Component";

export function render(query: string, block: Component) {
  const root = document.querySelector(query);
  // Можно завязаться на реализации вашего класса Block
  if (root) {
    root.innerHTML = "";
    const content = block.getContent()
    root.append(content!);

    block.dispatchComponentDidMount();

  }
}