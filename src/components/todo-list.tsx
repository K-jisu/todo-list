"use client";

import {
  useAddTodo,
  useRemoveTodo,
  useUpdateTodo,
} from "@/hooks/mutation/useTodosMutations";
import { useGetTodos } from "@/hooks/queries/useTodosQuery";
import { updateType } from "@/types/todo.type";
import { useState } from "react";

type CompletedType = "all" | "completed" | "incompleted";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [completed, setCompleted] = useState<CompletedType>("all");

  const { data } = useGetTodos();

  const { mutate: addMutate } = useAddTodo();

  const { mutate: removeMutate } = useRemoveTodo();

  const { mutate: updateMutate } = useUpdateTodo();

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

  const handleUpdateTodo = (updateTodo: updateType) => {
    const updateValue = {
      editId: updateTodo.editId,
      editTitle: updateTodo.editTitle,
      editCompleted: updateTodo.editCompleted,
    };
    updateMutate(updateValue);
    setInputValue("");
  };

  const handleResetEdit = () => {
    setEditId("");
    setEditTitle("");
  };

  if (!data) return <div>No data</div>;

  const todos = data.filter((item) => {
    switch (completed) {
      case "completed":
        return item.completed;
      case "incompleted":
        return !item.completed;
      default:
        return true;
    }
  });

  return (
    <div className="w-full max-w-2xl p-6 bg-white text-black shadow-md rounded-lg flex flex-col items-center mx-auto">
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

      <div className="flex justify-between items-center mb-4 text-gray-600">
        <span>
          총 {data.length}개 / 완료{" "}
          {data.filter((item) => item.completed).length}개
        </span>
      </div>
      <div className="flex gap-4">
        <span
          className={`px-2 py-1 rounded ${
            completed === "all"
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setCompleted("all")}
        >
          전체
        </span>
        <span
          className={`px-2 py-1 rounded ${
            completed === "completed"
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setCompleted("completed")}
        >
          완료
        </span>
        <span
          className={`px-2 py-1 rounded ${
            completed === "incompleted"
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setCompleted("incompleted")}
        >
          미완료
        </span>
      </div>

      <div className="border border-b-gray-50 w-full m-4" />

      <div className="space-y-3">
        {todos.map((item) => {
          return (
            <div
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 gap-3 w-full"
              key={item.id}
            >
              <div className="flex items-center gap-3 flex-1">
                {editId !== item.id && (
                  <input
                    type="checkbox"
                    checked={item.completed}
                    className="w-4 h-4"
                    onChange={() =>
                      handleUpdateTodo({
                        editId: item.id,
                        editCompleted: !item.completed,
                      })
                    }
                  />
                )}
                {editId === item.id ? (
                  <input
                    type="text"
                    placeholder="수정할 내용"
                    className="px-2 py-1 border border-gray-300 rounded text-black flex-1"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                ) : (
                  <span
                    className={`flex-1 break-words  ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm flex-shrink-0">
                {editId === item.id ? (
                  <>
                    <button
                      className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800 w-12"
                      onClick={() => {
                        handleUpdateTodo({ editId: item.id, editTitle });
                        handleResetEdit();
                      }}
                    >
                      저장
                    </button>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 w-12"
                      onClick={handleResetEdit}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 w-12"
                      onClick={() => setEditId(item.id)}
                    >
                      수정
                    </button>
                    <button
                      className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 w-12"
                      onClick={() => handleRemoveTodo(item.id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
