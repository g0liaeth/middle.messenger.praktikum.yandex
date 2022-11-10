import { RegistrationData } from '../types/commonTypes';
import BaseController from './BaseController';

export default class RegistrationController extends BaseController {
  async registration(data: RegistrationData) {
    try {
      const res = await this._api.registration(data);
      if (res.status === 200) {
        this._store.setState('user', res.data);
        this._router.go('/chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
