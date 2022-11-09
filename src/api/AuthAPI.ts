import { LoginData, RegistrationData } from '../types/commonTypes';
import BaseAPI from './BaseAPI';

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async login(data: LoginData): Promise<void> {
    const result = await this.httpClient.post('/signin', { data, headers });
    return result;
  }

  async registration(data: RegistrationData) {
    const response = await this.httpClient.post('/signup', { data });
    return response.data;
  }

  async logout(): Promise<void> {
    await this.httpClient.post('/logout');
  }

  async getUserInfo() {
    const result = await this.httpClient.get('/user');
    // console.log(result.data);

    return result;
  }
}
