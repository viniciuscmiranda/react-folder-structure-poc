import { useQuery } from "@/hooks/use-query";
import type { ITodosService } from "@/types/services/todos-service.types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { InvalidAPIRequestError } from "@/lib/errors";
import {
  CreateTodoData,
  TodoPath,
  UpdateTodoData,
} from "@/types/services/todos-service.types";

export function useTodosForm(todosService: ITodosService, todoPath?: TodoPath) {
  const todoExists = !!todoPath;

  const {
    data: todo,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    [QUERY_KEYS.TODOS_READ, todoPath],
    () => todosService.read(todoPath!),
    {
      enabled: todoExists,
    }
  );

  const todoIsDeleted = Boolean(todo?.deleted_at);

  function invalidateList() {
    // query client invalidate QUERY_KEYS.TODOS_LIST
  }

  async function createTodo(data: CreateTodoData) {
    if (todoExists) {
      throw new InvalidAPIRequestError("Could not create existent to-do");
    }

    const res = await todosService.create(data);
    invalidateList();

    return res;
  }

  async function updateTodo(data: UpdateTodoData) {
    if (!todoExists) {
      throw new InvalidAPIRequestError("Could not update non existent to-do");
    }

    const res = await todosService.update(todoPath, data);

    invalidateList();
    await refetch();
    return res;
  }

  async function deleteTodo() {
    if (!todoExists) {
      throw new InvalidAPIRequestError("Could not delete non existent to-do");
    }

    if (todoIsDeleted) {
      throw new InvalidAPIRequestError(
        "Could not delete already deleted to-do"
      );
    }

    const res = await todosService.delete(todoPath);

    invalidateList();
    await refetch();
    return res;
  }

  async function restoreTodo() {
    if (!todoExists) {
      throw new InvalidAPIRequestError("Could not restore non existent todo");
    }

    if (!todoIsDeleted) {
      throw new InvalidAPIRequestError("Could not restore non deleted todo");
    }

    const res = await todosService.restore(todoPath);

    invalidateList();
    await refetch();
    return res;
  }

  return {
    todo,
    isError,
    todoExists,
    isLoading,
    todoIsDeleted,
    refetchTodo: refetch,
    createTodo,
    updateTodo,
    deleteTodo,
    restoreTodo,
  };
}
