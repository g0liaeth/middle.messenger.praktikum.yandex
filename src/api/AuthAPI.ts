import { LoginData, RegistrationData } from '../types/commonTypes';
import BaseAPI from './BaseAPI';

const headers = {
  'Content-Type': 'application/json',
};

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async login(data: LoginData) {
    const result = await this.httpClient.post('/signin', { data, headers });
    return result;
  }

  async registration(data: RegistrationData) {
    const response = await this.httpClient.post('/signup', { data });
    return response.data;
  }

  async logout() {
    const result = await this.httpClient.post('/logout');
    return result;
  }

  async getUserInfo() {
    const result = await this.httpClient.get('/user');
    return result;
  }
}
