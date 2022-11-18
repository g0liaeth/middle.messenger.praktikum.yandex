import AuthAPI from '../../api/AuthAPI';
import { RegistrationData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

export default class RegistrationController extends BaseController {
  private _authAPI: AuthAPI;

  constructor() {
    super();
    this._authAPI = new AuthAPI();
  }

  async registration(data: RegistrationData) {
    try {
      const res = await this._authAPI.registration(data);
      if (res.status === 200) {
        this._store.setState('profileState.user', res.data);
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
