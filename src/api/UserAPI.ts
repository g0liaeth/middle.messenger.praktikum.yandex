import { ChangePasswordData, ChangeProfileData, UserData } from '../types/commonTypes';
import { TResponse } from '../utils/Http/HTTPClient';
import BaseAPI from './BaseAPI';

const headers = {
  'Content-Type': 'application/json',
};

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  async changePassword(data: ChangePasswordData): Promise<TResponse<string>> {
    const result = await this.httpClient.put('/password', { data, headers });
    return result;
  }

  async changeProfile(data: ChangeProfileData): Promise<TResponse<UserData>> {
    const result = await this.httpClient.put('/profile', { data, headers });
    return result;
  }

  async changeAvatar(data: File): Promise<TResponse<UserData>> {
    const formData = new FormData();
    formData.append('avatar', data);
    const result = await this.httpClient.put('/profile/avatar', { data: formData });
    return result;
  }

  async getUserById() {
    throw new Error('Not implemented');
  }

  async searchUserByLogin(login: string) {
    const result = await this.httpClient.post('/search', { data: { login }, headers });
    return result;
  }
}
