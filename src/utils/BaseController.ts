import Router from './Router/Router';
import Store from './Store/Store';

export default abstract class BaseController {
  protected _router: Router;
  protected _store: Store;

  constructor() {
    this._router = new Router();
    this._store = new Store();
  }
}
