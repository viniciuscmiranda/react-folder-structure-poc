import type { DBProps, PaginatedResponse, RequestParams } from "@/types/Api";

type Todo = {
  id: Id;
  title: string;
};

export type ListTodosData = Todo;
export type ListTodosResponse = PaginatedResponse<ListTodosData>;
export type ListTodosParams = RequestParams;

export type ReadTodoResponse = DBProps<Todo>;

export type CreateTodoData = Omit<Todo, "id">;
export type CreateTodoResponse = Todo;

export type UpdateTodoData = Partial<CreateTodoData>;
export type UpdateTodoResponse = Todo;

export type TodoPath = { todoId: Id };

export interface ITodosService {
  list(params: ListTodosParams): Promise<ListTodosResponse>;
  create(data: CreateTodoData): Promise<CreateTodoResponse>;
  read(path: TodoPath): Promise<ReadTodoResponse>;
  update(path: TodoPath, data: UpdateTodoData): Promise<UpdateTodoResponse>;
  delete(path: TodoPath): Promise<void>;
  restore(path: TodoPath): Promise<void>;
}
