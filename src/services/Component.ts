import { EventBus } from "./EventBus";
import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import { patch, recycleNode } from "./vdom";
export default class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;
  children = {};
  _id = null;
  _tpl = null;
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

    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this._id });

    const { children } = this._getChildren(props);

    this.children = children;
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
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

    this.children &&
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentDidMount();
      });
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const fragment = this.compile(this._tpl!, this.props);
    console.log(fragment);
    const newElement = fragment as TElement;
    if (this._element) {
      this._removeEvents();
      const newNode = recycleNode(newElement);
      patch(newNode, this._element);
      this._addEvents();
    }
  }
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  get element() {
    return this._element;
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
  _render() {
    const fragment = this.render();
    const newElement = fragment as TElement;
    if (this._element) {
      this._removeEvents();

      if (this._element !== newElement) {
        const newNode = recycleNode(newElement);
        patch(newNode, this._element);
      }
      this._element = newElement;
      this._addEvents();
      this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }
  }

  compile(template, props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    if (!this._tpl) this._tpl = template;
    const tmpl = template(propsAndStubs);
    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = tmpl;
    const result = fragment.content.children[0];
    Object.values(this.children).forEach((child) => {
      const stub = result.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.getContent());
    });
    return result;
  }

  render() {}

  getContent() {
    return this.element;
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
        const oldValue = target[prop];
        if (oldValue !== value) {
          target[prop] = value;
          if (oldValue !== value && !(typeof value === "function"))
            self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldValue, value);
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "Component";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
