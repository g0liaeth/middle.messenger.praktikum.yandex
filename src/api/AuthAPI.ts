import BaseAPI from './BaseAPI';

export type LoginData = {
  login: string;
  password: string;
};

type RegistrationData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

// type RegistrationResponseData = {
//   id: number;
// };

// type UserData = {
//   id: number;
//   first_name: string;
//   second_name: string;
//   display_name: string;
//   login: string;
//   email: string;
//   phone: string;
//   avatar: string;
// };

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
    // console.log(result);

    return result;
  }
}
