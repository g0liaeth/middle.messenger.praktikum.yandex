import AuthAPI from '../api/AuthAPI';
import Router from '../utils/Router/Router';
import Store from '../utils/Store/Store';

export default abstract class BaseController {
  protected _api: AuthAPI;
  protected _router: Router;
  protected _store = Store;

  constructor() {
    this._api = new AuthAPI();
    this._router = new Router();
  }
}
