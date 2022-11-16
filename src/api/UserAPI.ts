import { ChangePasswordData, ChangeProfileData, UserData } from '../types/commonTypes';
import { TResponse } from '../utils/Http/HTTPClient';
import BaseAPI from './BaseAPI';

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

const headers2 = {
  'Content-Type': 'multipart/form-data',
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
    const result = await this.httpClient.put('/profile/avatar', {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result;
  }

  async getUserById() {
    throw new Error('Not implemented');
  }

  async searchUserByLogin() {
    throw new Error('Not implemented');
  }
}
