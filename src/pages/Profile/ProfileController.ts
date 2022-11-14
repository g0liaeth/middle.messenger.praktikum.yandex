import BaseController from '../../utils/BaseController';

export default class ProfileController extends BaseController {
  async fetchUser() {
    try {
      const state = this._store.getState();
      if (!state.user.login) {
        const res = await this._api.getUserInfo();
        if (res.status === 200) {
          this._store.setState('user', res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
