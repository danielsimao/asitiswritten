import { Combobox, ComboboxInput, ComboboxPopover } from '@reach/combobox';
import '@reach/dialog/styles.css';
import { Ref } from 'react';
import books from '../../../data/bible-books';
import { findBookByName } from '../../../utils';
import ChapterList from '../../ChapterList';
import styles from './ChapterInput.module.css';

export default function ChapterInput({
  book,
  onSelect,
  onBlur,
  onFocus,
  onClick,
  inputRef
}: {
  book?: string;
  onSelect?: (chapter: number) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
  inputRef: Ref<HTMLInputElement>;
}) {
  const bibleBook = book ? findBookByName(book, books) : undefined;

  function handleSelect(chapter: number) {
    const selected = Number(chapter);
    onSelect?.(selected);
  }

  return (
    <>
      <input
        // ref={inputRef}
        onClick={onClick}
        // onBlur={onBlur}
        // onFocus={onFocus}
        readOnly={!book}
        placeholder="Escolha um capítulo"
        className="block md:hidden text-gray-900 dark:text-gray-100 bg-transparent outline-none"
      />
      <Combobox onSelect={(val) => handleSelect(Number(val))} openOnFocus>
        <ComboboxInput
          ref={inputRef}
          readOnly={!book}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          id="chapter"
          name="chapter"
          placeholder="Escolha um capítulo"
          className="hidden md:block text-gray-900 dark:text-gray-100 bg-transparent outline-none"
          aria-labelledby="chapter"
        />
        <ComboboxPopover
          portal={false}
          className={styles['search-popover']}
          style={{ visibility: !bibleBook ? 'hidden' : undefined }}
        >
          <ChapterList
            isCombobox
            chapterCount={bibleBook?.chapters}
            onSelect={handleSelect}
          />
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
