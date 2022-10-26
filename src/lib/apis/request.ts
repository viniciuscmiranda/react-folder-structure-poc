import { toast } from "@/lib/utils";
import { getServerErrorMessage } from "./get-server-error-message";

export type RequestOptions<T> = {
  onSuccess?: (response: T) => Promise<void> | void;
  onError?: (error: unknown) => void;
  throws?: boolean;
};

type RequestFunction<T> = () => Promise<T>;

// wraps promises in try catch block
export class Request<T> {
  private static defaultOptions: RequestOptions<never> = {};
  private request: RequestFunction<T>;
  private options: RequestOptions<T>;

  constructor(request: RequestFunction<T>, options?: RequestOptions<T>) {
    this.request = request;
    this.options = Object.assign(Request.defaultOptions, options);
  }

  async execute(options?: RequestOptions<T>): Promise<T | void> {
    const { onError, onSuccess, throws } = Object.assign(this.options, options);

    try {
      const response = await this.request();

      await onSuccess?.(response);

      return response;
    } catch (err) {
      if (throws) throw err;

      toast.error(getServerErrorMessage(err));
      onError?.(err);
    }
  }
}
