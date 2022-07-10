import { Popover, Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';

export type OptionsPopoverProps = {
  font: number;
  onChangeFont: (font: number) => void;
};

export default function OptionsPopover({
  font,
  onChangeFont
}: OptionsPopoverProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Popover className="relative">
      <Popover.Button className="h-10 w-10 p-2 md:rounded md:bg-[#E28C5B] md:dark:bg-gray-800">
        aA
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 mt-3 w-auto max-w-sm px-4 sm:px-0 lg:max-w-3xl">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex gap-2 bg-gray-200 p-4 dark:bg-gray-800">
            <div className="flex">
              <button
                onClick={() => onChangeFont(font - 1)}
                className="rounded-l border-r-2 border-gray-200 bg-gray-100 py-2 px-6 dark:border-gray-800 dark:bg-gray-700"
              >
                a
              </button>
              <button
                onClick={() => onChangeFont(font + 1)}
                className="rounded-r bg-gray-100 py-2 px-6 dark:bg-gray-700"
              >
                A
              </button>
            </div>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="h-10 w-10 rounded bg-gray-100 p-3 dark:bg-gray-700"
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-4 w-4 text-gray-800 dark:text-gray-200"
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
