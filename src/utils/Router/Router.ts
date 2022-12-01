import { BlockInheritor } from '../../types/commonTypes';
import Route from './Route';

export default class Router {
  routes: Route[];
  history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  static _instance: Router | null;

  constructor(rootQuery?: string) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery ? rootQuery : '';

    Router._instance = this;
  }

  use(
    pathname: string,
    block: BlockInheritor,
    tag: string,
    props: Record<string, unknown>,
  ): Router {
    const route = new Route(pathname, block, tag, { rootQuery: this._rootQuery, props });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as typeof window).location.pathname);
    };

    //todo try to disable
    this._currentRoute = this.getRoute(window.location.pathname);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | null {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}
