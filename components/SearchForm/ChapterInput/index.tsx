import { Combobox, ComboboxInput, ComboboxPopover } from '@reach/combobox';
import '@reach/dialog/styles.css';
import { Ref, useEffect, useState } from 'react';
import books from '../../../data/bible-books';
import { findBookByName } from '../../../utils';
import ChapterList from '../ChapterList';
import styles from './ChapterInput.module.css';

export default function ChapterInput({
  value: _value,
  book,
  onSelect,
  onBlur,
  onFocus,
  onClick,
  inputRef
}: {
  value?: number;
  book?: string;
  onSelect?: (chapter: number) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
  inputRef: Ref<HTMLInputElement>;
}) {
  const [value, setValue] = useState<number | undefined>(_value);
  const [isReady, setReady] = useState(false);
  const bibleBook = book ? findBookByName(book, books) : undefined;

  function handleSelect(chapter: number) {
    const selected = Number(chapter);
    onSelect?.(selected);
    setValue(chapter);
  }

  function handleClick() {
    onClick();
    setReady(true);
  }

  useEffect(() => {
    setValue(_value);
    setReady(false);
  }, [_value]);

  return (
    <>
      <input
        // ref={inputRef}
        onClick={onClick}
        // onBlur={onBlur}
        // onFocus={onFocus}
        readOnly={!book}
        placeholder="Escolha um capítulo"
        className="block md:hidden text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none"
      />
      <Combobox onSelect={(val) => handleSelect(Number(val))} openOnFocus>
        <ComboboxInput
          value={value?.toString()}
          ref={inputRef}
          readOnly={!book}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={handleClick}
          onChange={(e) => setValue(Number(e.target.value))}
          id="chapter"
          name="chapter"
          placeholder="Escolha um capítulo"
          className="hidden md:block text-sm text-gray-900 dark:text-gray-100 placeholder:font-light bg-transparent outline-none leading-none"
          aria-labelledby="chapter"
        />
        {isReady && (
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
        )}
      </Combobox>
    </>
  );
}
