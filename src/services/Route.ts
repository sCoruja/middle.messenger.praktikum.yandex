import { render } from "../utils/renderDOM";
import Component from "./Component";

type RouteProps = {
  rootQuery: string;
};

class Route {
  _pathname: string | RegExp;
  private _blockClass: typeof Component;
  private _block: Component | null;
  private _props: RouteProps;
  constructor(
    pathname: string | RegExp,
    view: typeof Component,
    props: RouteProps
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public get pathname() {
    return this._pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render(pathname);
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
      this._block = null;
    }
  }

  match(pathname: string) {
    if (typeof this._pathname === "string")
      return pathname === this._pathname || this._pathname === "/*";
    if (this._pathname instanceof RegExp)
      return (this._pathname as RegExp).test(pathname);
  }

  render(pathname: string) {
    if (!this._block) {
      this._block = new this._blockClass({ pathname });
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
export default Route;
