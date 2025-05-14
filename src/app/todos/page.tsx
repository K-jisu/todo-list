"use client";

import api from "@/api/axios/api";
import { TodoListType, TodoType } from "@/types/todo.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as TodoListType;
    },
  });

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      투두리스트
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button>제출</button>
      </div>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <input type="checkbox" />
              {item.title}
              <button>삭제</button>
              <button>수정</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
