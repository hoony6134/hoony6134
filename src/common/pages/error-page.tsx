import { Link } from '@tanstack/react-router';

interface ErrorPageProps {
  error: Error;
  reset?: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center dark:bg-gray-950">
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
        Error
      </span>
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        오류가 발생했어요
      </h1>
      <p className="max-w-md text-base text-gray-500 dark:text-gray-400">{error.message}</p>
      <div className="flex gap-3">
        {reset && (
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            다시 시도
          </button>
        )}
        <Link
          to="/"
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
