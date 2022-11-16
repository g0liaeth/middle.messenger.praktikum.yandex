import { BASE_URL } from '../../constants/apiConstants';
import { PlainObject } from '../../types/commonTypes';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data: PlainObject | FormData;
  headers: Record<string, string>;
  timeout: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchParams = (url: string, options?: Partial<Options>) => Promise<any>;

export type TResponse<T = unknown> = {
  status: number;
  statusText: string;
  data: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function createResponse(xhr: XMLHttpRequest): TResponse {
  return {
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.response,
  };
}

export default class HTTPClient {
  private _apiURL: string;

  constructor(path: string) {
    this._apiURL = BASE_URL + path;
  }

  private _queryStringify(data: PlainObject) {
    if (!isPlainObject(data)) {
      // throw new Error('input must be an object');
      return '';
    }

    return getParams(data)
      .map((arr) => arr.join('='))
      .join('&');
  }

  public get: FetchParams = (url, options) => {
    return this._request(url + this._queryStringify(options?.data as PlainObject), {
      ...options,
      method: METHODS.GET,
    });
  };

  public put: FetchParams = (url, options) => {
    return this._request(url, { ...options, method: METHODS.PUT });
  };

  public post: FetchParams = (url, options) => {
    return this._request(url, { ...options, method: METHODS.POST });
  };

  public delete: FetchParams = (url, options) => {
    return this._request(url, { ...options, method: METHODS.DELETE });
  };

  private _request: FetchParams = (url, options = { method: METHODS.GET, timeout: 5000 }) => {
    const { method, headers, data, timeout } = options;
    url = `${this._apiURL}${url}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as METHODS, url);
      xhr.responseType = 'json';

      xhr.withCredentials = true;
      xhr.timeout = timeout as number;

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onload = function () {
        resolve(createResponse(xhr));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
