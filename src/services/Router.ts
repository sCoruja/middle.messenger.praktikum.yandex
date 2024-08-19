import Component from "./Component";
import Route from "./Route";

class Router {
  routes: Route[] = [];
  history?: History;
  private _currentRoute?: Route | null;
  private _rootQuery: string = '';
  static __instance: Router;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string | RegExp, block: typeof Component) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route?.render(pathname as string);
  }

  public go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
    this._onRoute(this._currentRoute?._pathname as string);
  }

  forward() {
    this.history?.forward();
    this._onRoute(this._currentRoute?._pathname as string);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
