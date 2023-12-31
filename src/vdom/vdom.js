const TEXT_NODE_TYPE = 3;

export const createVNode = (tagName, props = {}, children = []) => {
  return {
    tagName,
    props,
    children,
  };
};

export const createDOMNode = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const { tagName, props, children } = vNode;

  // создаем DOM-узел
  const node = document.createElement(tagName);

  // Добавляем атрибуты к DOM-узлу
  patchProps(node, {}, props);

  // Рекурсивно обрабатываем дочерные узлы
  children.forEach((child) => {
    node.appendChild(createDOMNode(child));
  });
  node.v = vNode;
  return node;
};

export const mount = (node, target) => {
  target.replaceWith(node);
  return node;
};

export const patchNode = (node, vNode, nextVNode) => {
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

const patchProp = (node, key, value, nextValue) => {
  // Если новое значение не задано, то удаляем атрибут
  if (nextValue == null || nextValue === false) {
    node.removeAttribute(key);
    return;
  }
  if (key.startsWith("on")) {
    const eventName = key.slice(2);

    node[eventName] = nextValue;

    if (!nextValue) {
      node.removeEventListener(eventName, listener);
    } else if (!value) {
      node.addEventListener(eventName, listener);
    }
    return;
  }

  // Устанавливаем новое значение атрибута
  node.setAttribute(key, nextValue);
};

const patchProps = (node, props, nextProps) => {
  // Объект с общими свойствами
  const mergedProps = { ...props, ...nextProps };

  Object.keys(mergedProps).forEach((key) => {
    // Если значение не изменилось, то ничего не обновляем
    if (props[key] !== nextProps[key]) {
      patchProp(node, key, props[key], nextProps[key]);
    }
  });
};

const patchChildren = (parent, vChildren, nextVChildren) => {
  parent.childNodes.forEach((childNode, i) => {
    patchNode(childNode, vChildren[i], nextVChildren[i]);
  });

  nextVChildren.slice(vChildren.length).forEach((vChild) => {
    parent.appendChild(createDOMNode(vChild));
  });
};

export const patch = (nextVNode, node) => {
  // Получаем текущее виртуальное дерево из DOM-ноды
  const vNode = node.v || recycleNode(node);
  // Патчим DOM-ноду
  node = patchNode(node, vNode, nextVNode);
  // Сохраняем виртуальное дерево в DOM-ноду
  node.v = nextVNode;

  return node;
};

export const recycleNode = (node) => {
  // Если текстовая нода - то возвращаем текст
  if (node.nodeType === TEXT_NODE_TYPE) {
    return node.nodeValue;
  }

  //  Получаем имя тега
  const tagName = node.nodeName.toLowerCase();
  //>Получаем аттрибуты
  const attrs = {};
  node.getAttributeNames().forEach((name) => {
    attrs[name] = node.getAttribute(name);
  });
  // attrs["click"] = node.click;
  // Рекурсивно обрабатываем дочерние ноды
  const children = [].map.call(node.childNodes, recycleNode);

  // Создаем виртуальную ноду
  return createVNode(tagName, attrs, children);
};

function listener(event) {
  return this[event.type](event);
}
