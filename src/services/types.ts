import { Component } from "./Component";

export type ComponentParams = {
  root?: RootElementType;
  children?: Component | Component[];
  events?: ComponentEvents;
};
export type ComponentMetaType = {
  props?: ComponentProps;
  children?: Component[] | Component;
  root: RootElementType;
};
export type ComponentProps = {
  [key: string]: any;
};
export type RootElementType = {
  tagName?: string;
  className?: string;
  id?: string;
};
export type ComponentEvents = {
  [event: string]: (ev: Event) => void;
};
export type EventBusListeners = {
  [event: string]: Function[];
};

export type HttpRequestOptions = {
  headers?: HttpRequestHeaders;
  method?: string;
  data?: { [key: string]: string };
  timeout?: number;
};
export type HttpRequestData = {
  [key: string]: string | HttpRequestData;
};
export type HttpRequestHeaders = {
  [key: string]: string;
};
