import { isEqual } from "../utils/utils";
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
  children: { [key: string]: Component };
  eventBus: () => EventBus;
  _element: Element | null = null;
  _meta: { props: ComponentProps; tagName: string };
  _tpl: Template | null = null;
  _isUpdate = false;
  _isMounted = false;
  __children?: { component: Component; embed: Function }[];
  constructor(props: ComponentProps = {}, tagName = "div") {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    const { children } = this._getChildren(props);
    this.children = children;
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
    this._element = this._createDocumentElement(tagName) as Element;
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

  init() {
    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    this._isMounted = true;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() { }

  dispatchComponentDidMount() { }

  _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    if (!this.componentDidUpdate(oldProps, newProps)) return;
    // console.log("UPDATED", this.constructor.name, this);
    // console.log(oldProps, newProps);
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    if (oldProps !== newProps) return true;
  }

  componentWillUnmount() { }

  _componentWillUnmount() {
    if (this.props) this._removeEvents();
    if (this.__children) {
      this.__children.forEach((child) => child.component.unmount?.());
    }
    this.componentWillUnmount();
    console.log("UNMOUNTED", this.constructor.name);
  }

  setProps = (nextProps: ComponentProps) => {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    this._isUpdate = false;
    Object.assign(this.props, nextProps);
    this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment as Element;
    this._removeEvents();
    this._element?.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
    if (!this._isMounted) this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  // Может переопределять пользователь, необязательно трогать
  render(): Element {
    return new Element();
  }

  getContent() {
    return this.element;
  }
  compile(template: Template, context: ComponentProps) {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });
    const html = template(contextAndStubs);
    this._tpl = template;
    const tmpl = document.createElement("template");
    tmpl.innerHTML = html;
    const result = tmpl.content.children[0];
    this.__children = contextAndStubs.__children;
    contextAndStubs.__children?.forEach(({ embed }: { embed: Function }) => {
      embed(result);
    });
    Object.values(this.children).forEach((child) => {
      const stub = result.querySelector(`[data-id="${child.id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });
    return result as Element;
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
        if (oldValue !== value) {
          target[prop] = value;
          if (oldValue !== value && !(typeof value === "function"))
            self._isUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Access denied");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    (this.element as HTMLElement).style.display = "";
  }

  hide() {
    (this.element as HTMLElement).style.display = "none";
  }
  unmount() {
    this._componentWillUnmount();
    this.element?.replaceWith("");
  }
}
export default Component;
