"use client";

import { useAddTodo } from "@/hooks/mutation/useTodosMutations";
import { useState } from "react";

const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");

  const { mutate: addMutate } = useAddTodo();

  const handleAddTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: inputValue,
      completed: false,
    };
    addMutate(newTodo);
    setInputValue("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">투두리스트</h2>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handleAddTodo}
        >
          추가
        </button>
      </div>
    </>
  );
};

export default TodoInput;
