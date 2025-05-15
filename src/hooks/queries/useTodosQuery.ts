import api from "@/apis/axios/api";
import { TodoListType } from "@/types/todo.type";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as TodoListType;
    },
  });
};
