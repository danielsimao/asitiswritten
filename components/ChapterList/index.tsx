import { ComboboxList, ComboboxOption } from '@reach/combobox';
import styles from './ChapterList.module.css';
import { PropsWithChildren } from 'react';

interface ChapterListProps {
  chapterCount?: number;
  onSelect: (chapter: number) => void;
  isCombobox?: boolean;
}

function ChapterButton({
  chapter,
  onClick,
  isCombobox
}: {
  chapter: number;
  onClick: (chapter: number) => void;
  isCombobox?: boolean;
}) {
  if (isCombobox) {
    return (
      <ComboboxOption
        className="flex justify-center items-center text-gray-900 dark:text-gray-100 w-12 h-12 border border-gray-300 dark:border-gray-800 hover:bg-gray dark:hover:bg-gray-800 rounded-xl"
        key={chapter.toString()}
        value={chapter.toString()}
      />
    );
  }

  return (
    <button
      tabIndex={0}
      type="button"
      className="text-gray-900 dark:text-gray-100 w-12 h-12 border border-gray-300 dark:border-gray-800 hover:bg-gray dark:hover:bg-gray-800 rounded-xl"
      onClick={() => onClick(chapter)}
    >
      {chapter}
    </button>
  );
}

export default function ChapterList({
  chapterCount,
  onSelect,
  isCombobox
}: ChapterListProps) {
  if (!chapterCount) {
    return null;
  }

  const chapters = Array(chapterCount)
    .fill(null)
    .map((_, i) => i + 1);

  if (isCombobox) {
    return (
      <ComboboxList
        className="grid grid grid-cols-7 justify-items-center gap-y-4 grid-flow-row max-h-72 overflow-auto"
        aria-labelledby="chapter"
      >
        {chapters.map((chapter) => (
          <ChapterButton
            isCombobox
            key={chapter}
            chapter={chapter}
            onClick={onSelect}
          />
        ))}
      </ComboboxList>
    );
  }

  return (
    <div className="grid grid grid-cols-6 justify-items-center gap-y-4 grid-flow-row p-6">
      {chapters.map((chapter) => (
        <ChapterButton key={chapter} chapter={chapter} onClick={onSelect} />
      ))}
    </div>
  );
}
