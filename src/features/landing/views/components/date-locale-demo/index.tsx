import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const FORMATS = [
  { token: 'LL', description: '날짜 (긴 형식)' },
  { token: 'LLL', description: '날짜 + 시각' },
  { token: 'LLLL', description: '요일 + 날짜 + 시각' },
  { token: 'dddd', description: '요일 (전체)' },
  { token: 'MMMM', description: '월 이름 (전체)' },
  { token: 'A', description: '오전/오후' },
] as const;

export function DateLocaleDemo() {
  const { i18n } = useTranslation();
  const now = dayjs();

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* sync status */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-500 dark:text-gray-400">i18n</span>
        <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-blue-600 dark:bg-gray-800 dark:text-blue-400">
          {i18n.language}
        </code>
        <span className="text-gray-400 dark:text-gray-500">↔</span>
        <span className="text-gray-500 dark:text-gray-400">dayjs</span>
        <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-blue-600 dark:bg-gray-800 dark:text-blue-400">
          {dayjs.locale()}
        </code>
        {i18n.language === dayjs.locale() ? (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
            ✓ 동기화됨
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-400">
            ✗ 불일치
          </span>
        )}
      </div>

      {/* format table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">토큰</th>
            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">설명</th>
            <th className="pb-2 text-left font-medium text-gray-500 dark:text-gray-400">결과</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {FORMATS.map(({ token, description }) => (
            <tr key={token}>
              <td className="py-2 pr-4">
                <code className="font-mono text-purple-600 dark:text-purple-400">{token}</code>
              </td>
              <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">{description}</td>
              <td className="py-2 font-medium text-gray-900 dark:text-gray-100">
                {now.format(token)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
