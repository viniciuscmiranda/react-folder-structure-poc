import { TodosService } from "@/services/todos-service";
import { useTodosList } from "./todos-list.hook";

export const TodosList = () => {
  const { todos } = useTodosList(new TodosService());

  return JSON.stringify(todos);
};
