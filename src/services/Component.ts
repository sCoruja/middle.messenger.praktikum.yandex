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
  private _element: Element | null = null;
  private _meta: { props: any; tagName: string };
  _tpl: Template | null = null;
  private _isUpdate = false;
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
    this._element = this._createDocumentElement(tagName) as Element;
  }

  init() {
    this._createResources();
    console.log(`INIT ${this.constructor.name}`);
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    if (!this.componentDidUpdate(oldProps, newProps)) return;
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    return true;
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
    this.eventBus().emit(EVENTS.FLOW_CDM);
    console.log(`RENDER ${this.constructor.name}`);
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
    const html = template(contextAndStubs);
    this._tpl = template;
    const tmpl = document.createElement("template");
    tmpl.innerHTML = html;
    const result = tmpl.content.children[0];

    contextAndStubs.__children?.forEach(({ embed }: { embed: Function }) => {
      embed(result);
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
