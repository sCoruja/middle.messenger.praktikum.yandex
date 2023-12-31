import { EventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";

import { ComponentEvents, ComponentParams, ComponentProps } from "./types";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export class Component {
  public id: string;
  props: ComponentProps = {};
  protected refs: Record<string, Component>;
  private children: Record<string, Component>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null;
  private _meta: { props: any, tagName: string };
  constructor(propsAndChildren: ComponentProps = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    this._meta = {
      tagName,
      props,
    };
    this.children = children;
    this._element = null;
    this.refs = {};
    const eventBus = new EventBus();
    this.id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this.id });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(oldProps: ComponentProps) {
    this.componentDidMount(oldProps);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: ComponentProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  private _componentDidUpdate(
    oldProps: ComponentProps,
    newProps: ComponentProps
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);

    return !(oldProps === newProps);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    return true;
  }

  setProps = (nextProps: ComponentProps) => {
    if (!nextProps) {
      return;
    }
    if (this.props) Object.assign(this.props, nextProps);
    else {
      this.props = nextProps;
    }
  };

  get element() {
    return this._element;
  }

  private _render(): void {
    this._removeEvents();
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }
  compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = template(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    return temp.content;


  }
  private _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+

    const self = this;
    return new Proxy(props, {
      get(target: typeof props, prop: keyof typeof props) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: typeof props, prop: keyof typeof props, value) {
        target[prop] = value;
        self.eventBus().emit(EVENTS.FLOW_CDU);
        self.eventBus().emit(EVENTS.FLOW_RENDER);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Access denied");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
  private _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }
  private _removeEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }
  private _getChildren(propsAndChildren: ComponentProps) {
    const children: ComponentProps = {};
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
  // show() {
  //   this.getContent().style.display = "block";
  // }

  // hide() {
  //   this.getContent().style.display = "none";
  // }
}
export default Component;
