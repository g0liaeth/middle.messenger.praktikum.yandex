import { LoginData } from '../types/commonTypes';
// import Store from '../utils/Store/Store';
import BaseController from './BaseController';

export default class LoginController extends BaseController {
  async login(data: LoginData) {
    try {
      await this._api.login(data);
      const res = await this._api.getUserInfo();
      if (res.status === 200) {
        this._store.setState('user', res.data);
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
