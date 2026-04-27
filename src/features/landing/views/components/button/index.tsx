import { cn } from '@/common/utils';

export function Button({ label, variant = 'primary', onClick }: Button.Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
          : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      )}
    >
      {label}
    </button>
  );
}

export namespace Button {
  export type Props = {
    label: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  };
}
