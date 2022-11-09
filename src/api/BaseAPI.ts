import HTTPClient from '../utils/Http/HTTPClient';

export default abstract class BaseAPI {
  protected httpClient: HTTPClient;

  constructor(path: string) {
    this.httpClient = new HTTPClient(path);
  }

  // create() {
  //   throw new Error('Not implemented');
  // }

  // request() {
  //   throw new Error('Not implemented');
  // }

  // update() {
  //   throw new Error('Not implemented');
  // }

  // delete() {
  //   throw new Error('Not implemented');
  // }
}
