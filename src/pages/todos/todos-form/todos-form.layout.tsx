import { Request } from "@/lib/apis";
import { useNavigate } from "@/hooks/use-navigate";
import { useTodosForm } from "./todos-form.hook";
import { makePath, toast } from "@/lib/utils";
import { useParams } from "@/hooks/use-params";
import { TodosService } from "@/services/todos-service";
import type { TodosFormPageParams } from "@/types/PageParams";
import type { TodoPath } from "@/types/services/todos-service.types";

type FormData = {
  title: string;
};

export const TodosForm = () => {
  const navigate = useNavigate();

  const todosService = new TodosService();
  const { todoId } = useParams<TodosFormPageParams>();

  const todoPath = makePath<TodoPath>({ todoId });

  const { todo, createTodo, updateTodo, deleteTodo, restoreTodo, todoExists } =
    useTodosForm(todosService, todoPath);

  // #region handlers
  async function onCreateTodo(data: FormData) {
    const request = new Request(() => createTodo(data));
    await request.execute({
      throws: true,
      onSuccess: ({ id }) => {
        toast.success("to-do created");
        navigate((paths) => paths.todos.read({ todoId: String(id) }));
      },
    });
  }

  async function onUpdateTodo(data: FormData) {
    const request = new Request(() => updateTodo(data));
    await request.execute({
      throws: true,
      onSuccess: () => toast.success("to-do updated"),
    });
  }

  async function onDeleteTodo() {
    const request = new Request(() => deleteTodo());
    await request.execute({
      onSuccess: () => toast.success("to-do deleted"),
    });
  }

  async function onRestoreTodo() {
    const request = new Request(() => restoreTodo());
    await request.execute({
      onSuccess: () => toast.success("to-do restored"),
    });
  }
  // #endregion

  async function onSubmitForm(data: FormData) {
    if (todoExists) await onUpdateTodo(data);
    else await onCreateTodo(data);
  }

  return JSON.stringify(todo);
};
