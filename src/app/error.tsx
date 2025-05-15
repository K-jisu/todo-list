"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { refresh } = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        문제가 발생했습니다
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {error?.message ?? "알 수 없는 에러가 발생했어요."}
      </p>

      {reset && (
        <button
          onClick={() =>
            startTransition(() => {
              refresh();
              reset();
            })
          }
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          다시 시도하기
        </button>
      )}
    </div>
  );
}
