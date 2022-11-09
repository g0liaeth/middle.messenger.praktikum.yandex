import AuthAPI, { LoginData } from '../api/AuthAPI';

export default class LoginController {
  private _api: AuthAPI;

  constructor() {
    this._api = new AuthAPI();
  }

  async login(data: LoginData) {
    try {
      await this._api.login(data);
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
