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
    <main className="flex flex-col items-center justify-between pt-20">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingPage />}>
          <TodoList />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
