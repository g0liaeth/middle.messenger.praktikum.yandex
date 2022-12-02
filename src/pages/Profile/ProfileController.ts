import AuthAPI from '../../api/AuthAPI';
import BaseController from '../../utils/BaseController';
// import { StoreEvents } from '../../utils/Store/Store';

export default class ProfileController extends BaseController {
  private _authAPI: AuthAPI;

  constructor() {
    super();
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
      // //todo think about it
      // this._store.emit(StoreEvents.Updated);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const res = await this._authAPI.logout();
      if (res.status === 200) {
        this._store.setState('profileState.user', {});
        this._router.go('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
