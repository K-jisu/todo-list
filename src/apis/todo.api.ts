import { TodoListType, TodoType, updateType } from "@/types/todo.type";

export const getTodos = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data as TodoListType;
};

export const addTodo = async (newTodo: TodoType) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("할 일 추가에 실패했습니다.");
  }
};

export const removeTodo = async (targetId: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/todos/" + targetId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("할 일 삭제에 실패했습니다.");
  }
};

export const updateTodo = async (updateValue: updateType) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/todos/" + updateValue.editId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateValue.editTitle,
        completed: updateValue.editCompleted,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("할 일 수정에 실패했습니다.");
  }
};
