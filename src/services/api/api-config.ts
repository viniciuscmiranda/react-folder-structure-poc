type RequestOptions = {
  params?: any;
  data?: any;
};

class Http {
  async get<T = void>(url: string, options?: RequestOptions) {
    return null as T;
  }

  async patch<T = void>(url: string, data?: any, options?: RequestOptions) {
    return null as T;
  }

  async put<T = void>(url: string, data?: any, options?: RequestOptions) {
    return null as T;
  }

  async post<T = void>(url: string, data?: any, options?: RequestOptions) {
    return null as T;
  }

  async delete<T = void>(url: string, options?: RequestOptions) {
    return null as T;
  }
}

export const http = new Http();
