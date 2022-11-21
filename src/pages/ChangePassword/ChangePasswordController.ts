import AuthAPI from '../../api/AuthAPI';
import UserAPI from '../../api/UserAPI';
import { ChangePasswordData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

export default class ChangePasswordController extends BaseController {
  private _userAPI: UserAPI;
  private _authAPI: AuthAPI;

  constructor() {
    super();
    this._userAPI = new UserAPI();
    this._authAPI = new AuthAPI();
  }

  async fetchUser() {
    try {
      const state = this._store.getState();
      if (!state.profileState.user.login) {
        const res = await this._authAPI.getUserInfo();
        if (res.status === 200) {
          this._store.setState('profileState.user', res.data);
        } else {
          this._router.go('/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(formData: ChangePasswordData) {
    try {
      const res = await this._userAPI.changePassword(formData);
      if (res.status === 200) {
        this._router.go('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this._router.go('/profile');
  }
}
