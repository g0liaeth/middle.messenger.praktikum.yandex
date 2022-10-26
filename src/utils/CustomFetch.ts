enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: any;
  headers?: Record<string, any>;
  timeout?: number;
};

type FetchParams = (url: string, options: Options) => Promise<XMLHttpRequest>;

export default class CustomFetch {
  private _queryStringify(data?: Record<string, any>) {
    if (data == null) {
      return '';
    }
    return `?${Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&')}`;
  }

  public get: FetchParams = (url, options = { method: METHODS.GET }) => {
    return this._request(url + this._queryStringify(options.data), options);
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
      xhr.timeout = options.timeout;

      for (let key in headers) {
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
      } else {
        xhr.send(data);
      }
    });
  };
}
