import AuthAPI from '../api/AuthAPI';
import { LoginData } from '../types/commonTypes';
import Router from '../utils/Router/Router';
import Store from '../utils/Store/Store';

export default class LoginController {
  private _api: AuthAPI;
  private _router: Router;

  constructor() {
    this._api = new AuthAPI();
    this._router = new Router();
  }

  async login(data: LoginData) {
    try {
      await this._api.login(data);
      const res = await this._api.getUserInfo();
      if (res.status === 200) {
        Store.setState('user', res.data);
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo() {
    try {
      const user = await this._api.getUserInfo();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
