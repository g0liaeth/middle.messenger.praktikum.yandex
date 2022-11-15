import AuthAPI from '../../api/AuthAPI';
import { LoginData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

export default class LoginController extends BaseController {
  private _authAPI: AuthAPI;

  constructor() {
    super();
    this._authAPI = new AuthAPI();
  }

  async login(data: LoginData) {
    try {
      await this._authAPI.login(data);
      const res = await this._authAPI.getUserInfo();
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
      const res = await this._authAPI.getUserInfo();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async checkAuth() {
    try {
      const res = await this._authAPI.getUserInfo();
      if (res.status === 200) {
        this._store.setState('user', res.data);
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
