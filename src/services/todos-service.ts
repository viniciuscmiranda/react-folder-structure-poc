import type {
  CreateTodoData,
  CreateTodoResponse,
  ITodosService,
  ListTodosParams,
  ListTodosResponse,
  ReadTodoResponse,
  UpdateTodoData,
  UpdateTodoResponse,
  TodoPath,
} from "@/types/services/todos-service.types";

import { http } from "./api/api-config";

export class TodosService implements ITodosService {
  async list(params: ListTodosParams) {
    return http.get<ListTodosResponse>("/todos", { params });
  }

  async create(data: CreateTodoData) {
    return http.post<CreateTodoResponse>("/todos", data);
  }

  async read({ todoId }: TodoPath) {
    return http.get<ReadTodoResponse>(`/todos/${todoId}`);
  }

  async update({ todoId }: TodoPath, data: UpdateTodoData) {
    return http.patch<UpdateTodoResponse>(`/todos/${todoId}`, data);
  }

  async delete({ todoId }: TodoPath) {
    return http.delete(`/todos/${todoId}`);
  }

  async restore({ todoId }: TodoPath) {
    return http.put(`/todos/${todoId}/restore`);
  }
}
