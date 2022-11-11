import { LoginData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

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
      const res = await this._api.getUserInfo();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async checkAuth() {
    try {
      const res = await this._api.getUserInfo();
      if (res.status === 200) {
        this._store.setState('user', res.data);
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
