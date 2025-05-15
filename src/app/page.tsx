import api from "@/apis/axios/api";
import { TodoListType } from "@/types/todo.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TodoList from "../components/todo-list";
import { Suspense } from "react";
import LoadingPage from "./loading";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data as TodoListType;
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<LoadingPage />}>
            <TodoList />
          </Suspense>
        </HydrationBoundary>
      </main>
    </div>
  );
}
