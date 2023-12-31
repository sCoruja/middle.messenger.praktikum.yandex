import { patch, recycleNode } from "../vdom/vdom";
import { EventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";

class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps, newProps) {
    // const response = this.componentDidUpdate(oldProps, newProps);
    this._removeEvents();
    const fragment = this.render();
    const newElement = fragment.firstElementChild;
    if (this._element) {
      // this._element.replaceWith(newElement);
      const newNode = recycleNode(newElement);
      patch(newNode, this._element);
    }

    // this._element = newElement;

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this._componentDidUpdate(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    // const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // this._element.innerHTML = block;
    this._removeEvents();
    const fragment = this.render();
    const newElement = fragment.firstElementChild;
    if (this._element) {
      // this._element.replaceWith(newElement);
      const newNode = recycleNode(newElement);
      patch(newNode, this._element);
    }
    // if (this._element) {
    //   this._element.replaceWith(newElement);
    // }

    this._element = newElement;

    this._addEvents();
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }
  compile(template, context) {
    const contextAndStubs = { ...context };
    const html = template(contextAndStubs);

    const tmpl = document.createElement("template");
    tmpl.innerHTML = html;

    const result = tmpl.content.children[0];
    const v = recycleNode(result);

    const temp = document.createElement(this._meta.tagName);
    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp);
    });
    return temp;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }
  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }
  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }
  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Access denied");
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {}

  hide() {}
}
export default Component;
