import AuthAPI from '../../api/AuthAPI';
import BaseController from '../../utils/BaseController';
import Profile from './Profile';
// import { StoreEvents } from '../../utils/Store/Store';

export default class ProfileController extends BaseController {
  private _authAPI: AuthAPI;

  constructor() {
    super();
    this._authAPI = new AuthAPI();
  }

  async getUserDetails(view: Profile) {
    try {
      const res = await this._authAPI.getUserInfo();
      if (res.status === 200) {
        view.setProps({ user: res.data });
      } else {
        this._router.go('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout(view: Profile) {
    try {
      const res = await this._authAPI.logout();
      if (res.status === 200) {
        view.setProps({ user: null });
        this._router.go('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
