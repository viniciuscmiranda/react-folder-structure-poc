export type RequestParams<T = unknown> = T & {
  offset: number;
  limit: number;
};

type Pagination = {
  total: number;
};

export type PaginatedResponse<T = unknown> = {
  data: T[];
  pagination: Pagination;
};

export type DBProps<T = unknown> = T & {
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
