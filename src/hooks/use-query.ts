// @tanstack/react-query useQuery
type QueryData<T> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
};

type QueryKey = any[];

type QueryCallback<T> = () => void | Promise<T>;

type QueryOptions = {
  enabled?: boolean;
};

export function useQuery<T>(
  queryKey: QueryKey,
  callback: QueryCallback<T>,
  options?: QueryOptions
): QueryData<T> {
  return {
    data: null as T,
    isError: false,
    isLoading: false,
    refetch: async () => {},
  };
}
