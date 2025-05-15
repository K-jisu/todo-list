import { TodoType, updateType } from "@/types/todo.type";
import api from "./axios/api";

export const addTodo = async (newTodo: TodoType) => {
  await api.post("/todos", newTodo);
};

export const removeTodo = async (targetId: string) => {
  await api.delete("/todos/" + targetId);
};

export const updateTodo = async (updateValue: updateType) => {
  await api.patch(`/todos/${updateValue.editId}`, {
    title: updateValue.editTitle,
    completed: updateValue.editCompleted,
  });
};
