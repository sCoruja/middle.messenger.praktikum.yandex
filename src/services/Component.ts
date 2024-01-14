import { TElement, patch, recycleNode } from "./VDOM";
import { EventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export type ComponentProps = {
  [key: string]: any;
};
export type Template = (context: ComponentProps) => string;

class Component {
  public id: string;
  props: ComponentProps = {};
  private eventBus: () => EventBus;
  private _element: TElement | null = null;
  private _meta: { props: any; tagName: string };
  _tpl: Template | null = null;

  constructor(tagName = "div", props: ComponentProps = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this.id = makeUUID();
    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName) as TElement;
  }

  init() {
    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {}

  _componentDidUpdate() {
    this._removeEvents();
    const fragment = this.compile(this._tpl!, this.props);
    const newElement = fragment as TElement;
    if (this._element) {
      const newNode = recycleNode(newElement);
      this._element = patch(newNode, this._element) as TElement;
      this._addEvents();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate() {}

  setProps = (nextProps: ComponentProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    this._removeEvents();
    const fragment = this.render();
    const newElement = fragment as TElement;
    if (this._element) {
      const newNode = recycleNode(newElement);
      patch(newNode, this._element);
      this._element = newElement;
      this._addEvents();
      this.eventBus().emit(EVENTS.FLOW_CDM);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render(): HTMLElement {
    return new HTMLElement();
  }

  getContent() {
    return this.element;
  }
  compile(template: Template, context: ComponentProps) {
    const contextAndStubs = { ...context };
    const html = template(contextAndStubs);
    this._tpl = template;
    const tmpl = document.createElement("template");
    tmpl.innerHTML = html;
    const result = tmpl.content.children[0];
    const v = recycleNode(result as TElement);

    const temp = document.createElement(this._meta.tagName);
    temp.innerHTML = html;
    const r = patch(v, temp as TElement);
    contextAndStubs.__children?.forEach(({ embed }: { embed: Function }) => {
      embed(result);
    });
    return result as TElement;
  }

  _addEvents() {
    const { events = {} } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }
  _removeEvents() {
    const { events = {} } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
      });
    }
  }
  _getChildren(propsAndChildren: ComponentProps) {
    const children: { [key: string]: Component } = {};
    const props: ComponentProps = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }
  _makePropsProxy(props: ComponentProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldValue = target[prop];
        target[prop] = value;
        self.eventBus().emit(EVENTS.FLOW_CDU, oldValue, value);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Access denied");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {}

  hide() {}
}
export default Component;
