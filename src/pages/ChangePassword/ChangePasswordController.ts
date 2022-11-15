import UserAPI from '../../api/UserAPI';
import { ChangePasswordData } from '../../types/commonTypes';
import BaseController from '../../utils/BaseController';

export default class ChangePasswordController extends BaseController {
  private _userAPI: UserAPI;

  constructor() {
    super();
    this._userAPI = new UserAPI();
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
