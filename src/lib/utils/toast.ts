export type ToastOptions = {};

export class Toast {
  private static defaultOptions: ToastOptions = {};
  private options: ToastOptions;

  constructor(options?: ToastOptions) {
    this.options = Object.assign(Toast.defaultOptions, options);
  }

  success(message: string, options?: ToastOptions) {
    console.log(message);
  }

  error(message: string, options?: ToastOptions) {
    console.error(message);
  }
}

export const toast = new Toast();
