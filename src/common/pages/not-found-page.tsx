import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center dark:bg-gray-950">
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
        404
      </span>
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        페이지를 찾을 수 없어요
      </h1>
      <p className="max-w-md text-base text-gray-500 dark:text-gray-400">
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
