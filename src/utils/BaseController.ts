import Router from '../utils/Router/Router';
import Store from '../utils/Store/Store';

export default abstract class BaseController {
  protected _router: Router;
  protected _store = Store;

  constructor() {
    this._router = new Router();
    window.__store = this._store;
  }
}
