import AuthAPI from '../../api/AuthAPI';
import { LoginData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

export default class LoginController extends BaseController {
  private _authAPI: AuthAPI;

  constructor() {
    super();
    this._authAPI = new AuthAPI();
  }

  async checkAuth() {
    try {
      const res = await this._authAPI.getUserInfo();
      if (res.status === 200) {
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(data: LoginData) {
    try {
      const res = await this._authAPI.login(data);
      if (res.status === 200) {
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
