"use client";

import api from "@/apis/axios/api";
import { addTodo } from "@/apis/todo.api";
import {
  useAddTodo,
  useRemoveTodo,
  useUpdateTodo,
} from "@/hooks/mutation/useTodosMutations";
import { useGetTodos } from "@/hooks/queries/useTodosQuery";
import { TodoType, updateType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CompletedType = "all" | "completed" | "incompleted";

const TodoList = () => {
  const queryClient = useQueryClient();
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
        <div>
          <span>총 {data.length}개</span>
          <span>완료 {data.filter((item) => item.completed).length}개</span>
        </div>
        <div>
          <span onClick={() => setCompleted("all")}>전체 투두</span>
          <span onClick={() => setCompleted("completed")}>완료 투두</span>
          <span onClick={() => setCompleted("incompleted")}>미완료 투두</span>
        </div>
        {todos.map((item) => {
          return (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() =>
                  handleUpdateTodo({
                    editId: item.id,
                    editCompleted: !item.completed,
                  })
                }
              />
              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    placeholder="수정할 제목"
                    className="text-black w-12"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                </>
              ) : (
                item.title
              )}
              <button onClick={() => handleRemoveTodo(item.id)}>삭제</button>
              {editId === item.id ? (
                <>
                  <button
                    onClick={() => {
                      handleUpdateTodo({ editId: item.id, editTitle });
                      handleResetEdit();
                    }}
                  >
                    수정
                  </button>
                  <button onClick={handleResetEdit}>취소</button>
                </>
              ) : (
                <button onClick={() => setEditId(item.id)}>수정</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
