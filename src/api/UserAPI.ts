import { ChangePasswordData } from '../types/commonTypes';
import BaseAPI from './BaseAPI';

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  async changePassword(data: ChangePasswordData) {
    const result = await this.httpClient.put('/password', { data, headers });
    return result;
  }
}
