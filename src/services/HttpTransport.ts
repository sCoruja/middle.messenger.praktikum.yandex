export type HttpRequestOptions = {
  headers?: HttpRequestHeaders;
  method?: string;
  data?: { [key: string]: any };
  timeout?: number;
};
export type HttpRequestData = {
  [key: string]: string | HttpRequestData;
};
export type HttpRequestHeaders = {
  [key: string]: string;
};

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

function queryStringify(data: HttpRequestData): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HttpTransport {
  get = (url: string, options: HttpRequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: HttpRequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: HttpRequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: HttpRequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: HttpRequestOptions = {},
    timeout = 5000,
    withCredentials = true
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.ontimeout = reject;
      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HttpTransport;
