import { PlainObject } from '../Router/Route';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;

  data?: PlainObject | FormData;

  headers?: Record<string, string>;
  timeout?: number;
};

type FetchParams = (url: string, options: Options) => Promise<XMLHttpRequest>;

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

export default class HTTPClient {
  private _queryStringify(data: PlainObject) {
    if (!isPlainObject(data)) {
      throw new Error('input must be an object');
    }

    return getParams(data)
      .map((arr) => arr.join('='))
      .join('&');
  }

  public get: FetchParams = (url, options = { method: METHODS.GET }) => {
    return this._request(url + this._queryStringify(options.data as PlainObject), options);
  };

  public put: FetchParams = (url, options = { method: METHODS.PUT }) => {
    return this._request(url, options);
  };

  public post: FetchParams = (url, options = { method: METHODS.POST }) => {
    return this._request(url, options);
  };

  public delete: FetchParams = (url, options = { method: METHODS.GET }) => {
    return this._request(url, options);
  };

  private _request: FetchParams = (url, options = { method: METHODS.GET, timeout: 5000 }) => {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.timeout = options.timeout as number;

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onload = function () {
        resolve(xhr);
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
