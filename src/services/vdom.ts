const TEXT_NODE_TYPE = 3;
type NodeProps = { [key: string]: string };
type VNode = {
  tagName: string;
  props: NodeProps;
  children: VNode[];
};
export type TElement = HTMLElement & { v: VNode | string };
export const createVNode = (
  tagName: string,
  props: NodeProps = {},
  children: VNode[] = []
): VNode => {
  return {
    tagName,
    props,
    children,
  };
};

export const createDOMNode = (vNode: VNode | string) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const { tagName, props, children } = vNode;

  // создаем DOM-узел
  const node = document.createElement(tagName) as TElement;

  // Добавляем атрибуты к DOM-узлу
  patchProps(node, {}, props);

  // Рекурсивно обрабатываем дочерные узлы
  children.forEach((child) => {
    node.appendChild(createDOMNode(child));
  });
  node.v = vNode;
  return node;
};

export const mount = (node: TElement, target: TElement) => {
  target.replaceWith(node);
  return node;
};

export const patchNode = (
  node: TElement,
  vNode: VNode | string,
  nextVNode: VNode | string
) => {
  // Удаляем ноду, если значение nextVNode не задано
  if (nextVNode === undefined) {
    node.remove();
    return;
  }

  if (typeof vNode === "string" || typeof nextVNode === "string") {
    // Заменяем ноду на новую, если как минимум одно из значений равно строке
    // и эти значения не равны друг другу
    if (vNode !== nextVNode) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }

    // Если два значения - это строки и они равны,
    // просто возвращаем текущую ноду
    return node;
  }

  // Заменяем ноду на новую, если теги не равны
  if (vNode.tagName !== nextVNode.tagName) {
    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }

  // Патчим свойства (реализация будет далее)
  patchProps(node, vNode.props, nextVNode.props);

  // Патчим детей (реализация будет далее)
  patchChildren(node, vNode.children, nextVNode.children);

  // Возвращаем обновленный DOM-элемент
  return node;
};

const patchProp = (node: TElement, key: string, value: any, nextValue: any) => {
  // Если новое значение не задано, то удаляем атрибут
  if (nextValue == null || nextValue === false) {
    node.removeAttribute(key);
    return;
  }
  if (key.startsWith("on")) {
    const eventName = key.slice(2);
    // node[eventName] = nextValue;

    if (!nextValue) {
      node.removeEventListener(eventName, nextValue);
    } else if (!value) {
      node.addEventListener(eventName, value);
    }
    return;
  }

  // Устанавливаем новое значение атрибута
  node.setAttribute(key, nextValue);
};

const patchProps = (node: TElement, props: NodeProps, nextProps: NodeProps) => {
  // Объект с общими свойствами
  const mergedProps = { ...props, ...nextProps };

  Object.keys(mergedProps).forEach((key) => {
    // Если значение не изменилось, то ничего не обновляем
    if (props[key] !== nextProps[key]) {
      patchProp(node, key, props[key], nextProps[key]);
    }
  });
};

const patchChildren = (
  parent: TElement,
  vChildren: VNode[],
  nextVChildren: VNode[]
) => {
  parent.childNodes.forEach((childNode, i) => {
    patchNode(childNode as TElement, vChildren[i], nextVChildren[i]);
  });

  nextVChildren.slice(vChildren.length).forEach((vChild) => {
    parent.appendChild(createDOMNode(vChild));
  });
};

export const patch = (nextVNode: VNode | string, node: TElement) => {
  // Получаем текущее виртуальное дерево из DOM-ноды
  const vNode = node.v || recycleNode(node);
  // Патчим DOM-ноду
  const nextNode = patchNode(node, vNode, nextVNode)!;
  // Сохраняем виртуальное дерево в DOM-ноду
  node.v = nextVNode;

  return nextNode;
};

export const recycleNode = (node: TElement): VNode | string => {
  // Если текстовая нода - то возвращаем текст
  // if (!node) {
  //   return "";
  // }
  if (node.nodeType === TEXT_NODE_TYPE) {
    return node.nodeValue ?? "";
  }

  //  Получаем имя тега
  const tagName = node.nodeName.toLowerCase();
  //>Получаем аттрибуты
  const attrs: { [key: string]: any } = {};
  node.getAttributeNames().forEach((name) => {
    attrs[name] = node.getAttribute(name);
  });
  // attrs["click"] = node.click;
  // Рекурсивно обрабатываем дочерние ноды
  const children = [].map.call(node.childNodes, recycleNode) as VNode[];

  // Создаем виртуальную ноду
  return createVNode(tagName, attrs, children);
};
