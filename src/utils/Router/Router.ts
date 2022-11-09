import { BlockInheritor } from '../../types/commonTypes';
import Route from './Route';

export default class Router {
  routes: Route[];
  history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  static __instance: Router | null;

  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery ? rootQuery : '';

    Router.__instance = this;
  }

  use(pathname: string, block: BlockInheritor, props: Record<string, unknown>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, props });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as typeof window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
