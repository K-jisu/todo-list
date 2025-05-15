import { getTodos } from "@/apis/todo.api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
