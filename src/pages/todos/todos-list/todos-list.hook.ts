import type { ITodosService } from "@/types/services/todos-service.types";
import { useQuery } from "@/hooks/use-query";
import { useState } from "@/hooks/use-state";

import { QUERY_KEYS } from "@/constants/query-keys";
import {
  ListTodosParams,
  ListTodosResponse,
} from "@/types/services/todos-service.types";

export const useTodosList = (
  todosService: ITodosService,
  initialParams?: ListTodosParams
) => {
  const [params, setParams] = useState(initialParams);

  const {
    data: meta,
    isError,
    isLoading,
    refetch,
  } = useQuery<ListTodosResponse>(
    [QUERY_KEYS.TODOS_LIST, params],
    () => todosService.list(params!),
    {
      enabled: Boolean(params),
    }
  );

  return {
    meta,
    todos: meta?.data || [],
    pagination: meta?.pagination,
    params,
    setParams,
    refetch,
    isLoading,
    isError,
  };
};
