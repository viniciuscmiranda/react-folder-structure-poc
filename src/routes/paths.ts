import { TodosFormPageParams } from "@/types/PageParams";

export const paths = {
  todos: {
    list: () => "/todos",
    create: () => "/todos/new",
    read: ({ todoId }: TodosFormPageParams) => `/todos/${todoId}`,
  },
} as const;
