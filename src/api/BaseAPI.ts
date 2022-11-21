import HTTPClient from '../utils/Http/HTTPClient';

export default abstract class BaseAPI {
  protected httpClient: HTTPClient;

  constructor(path: string) {
    this.httpClient = new HTTPClient(path);
  }
}
