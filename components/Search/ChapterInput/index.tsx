import { Combobox, ComboboxInput, ComboboxPopover } from '@reach/combobox';
import '@reach/dialog/styles.css';
import { Ref, useEffect, useState } from 'react';
import books from '../../../data/bible-books';
import { findBookByName } from '../../../utils';
import ChapterList from '../ChapterList';
import styles from './ChapterInput.module.css';

type ChapterInputProps = {
  value?: string;
  book?: string;
  onSelect?: (chapter: number) => void;
  inputRef: Ref<HTMLInputElement>;
};

export default function ChapterInput({
  value: _value,
  book,
  onSelect,
  inputRef
}: ChapterInputProps) {
  const [value, setValue] = useState<string | undefined>(_value);
  const [isReady, setReady] = useState(false);
  const bibleBook = book ? findBookByName(book, books) : undefined;

  function handleSelect(chapter: string) {
    const selected = Number(chapter);
    onSelect?.(selected);
    setValue(chapter);
  }

  function handleClick() {
    setReady(true);
  }

  useEffect(() => {
    setValue(_value);
    setReady(false);
  }, [_value]);

  return (
    <Combobox onSelect={(val) => handleSelect(val)} openOnFocus>
      <ComboboxInput
        value={value?.toString()}
        ref={inputRef}
        readOnly={!book}
        onClick={handleClick}
        onChange={(e) => setValue(e.target.value)}
        id="chapter"
        name="chapter"
        placeholder="Escolha um capítulo"
        className="hidden bg-transparent text-sm leading-none text-gray-900 outline-none placeholder:font-light dark:text-gray-100 md:block"
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
  );
}
