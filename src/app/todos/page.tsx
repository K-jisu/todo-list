"use client";

import api from "@/api/axios/api";
import { TodoListType, TodoType } from "@/types/todo.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoList = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as TodoListType;
    },
  });

  const addTodo = async (newTodo: TodoType) => {
    await api.post("/todos", newTodo);
  };

  const removeTodo = async (targetId: string) => {
    await api.delete("/todos/" + targetId);
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: removeMutate } = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: inputValue,
      completed: false,
    };
    addMutate(newTodo);
    setInputValue("");
  };

  const handleRemoveTodo = (targetId: string) => {
    removeMutate(targetId);
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      투두리스트
      <div>
        <input
          className="text-black"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={handleAddTodo}>제출</button>
      </div>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <input type="checkbox" />
              {item.title}
              <button onClick={() => handleRemoveTodo(item.id)}>삭제</button>
              <button>수정</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
