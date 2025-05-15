"use server";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TodoList from "../components/todo-list";
import { Suspense } from "react";
import LoadingPage from "./loading";
import TodoInput from "@/components/todo-input";
import { getTodos } from "@/apis/todo.api";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <main className="flex flex-col items-center justify-between pt-20">
      <div className="w-full max-w-2xl p-6 bg-white text-black shadow-md rounded-lg flex flex-col items-center mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TodoInput />
          <Suspense fallback={<LoadingPage />}>
            <TodoList />
          </Suspense>
        </HydrationBoundary>
      </div>
    </main>
  );
}
