import { LoginData, RegistrationData, RegistrationResponse, UserData } from '../types/commonTypes';
import { TResponse } from '../utils/Http/HTTPClient';
import BaseAPI from './BaseAPI';

const headers = {
  'Content-Type': 'application/json',
};

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async login(data: LoginData): Promise<TResponse<string>> {
    const result = await this.httpClient.post('/signin', { data, headers });
    return result;
  }

  async registration(data: RegistrationData): Promise<TResponse<RegistrationResponse>> {
    const response = await this.httpClient.post('/signup', { data, headers });
    return response.data;
  }

  async logout() {
    const result = await this.httpClient.post('/logout');
    return result;
  }

  async getUserInfo(): Promise<TResponse<UserData>> {
    const result = await this.httpClient.get('/user');
    return result;
  }
}
