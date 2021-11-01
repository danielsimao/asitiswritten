import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import classnames from 'classnames';
import { ChangeEvent, ChangeEventHandler, Ref, useState } from 'react';
import { autocompleteMatch } from '../../../utils';
import styles from './BookCombobox.module.css';

export type BookComboboxProps = {
  results: any;
  inputRef: Ref<HTMLInputElement>;
  onSelect: (item: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export default function BookCombobox({
  results,
  inputRef,
  onSelect,
  onFocus,
  onBlur,
  onClick,
  onChange
}: BookComboboxProps) {
  const [search, setSearch] = useState('');
  const bookResults = autocompleteMatch(results, search);

  function handleSelect(item: string) {
    setSearch(item);
    onSelect(item);
  }

  return (
    <>
      <Combobox
        className="hidden md:block"
        onSelect={(item) => handleSelect(item)}
        openOnFocus
      >
        <ComboboxInput
          autoFocus
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          id="book"
          name="book"
          placeholder="O que vai ler?"
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e);
          }}
          className="text-base w-full md:w-auto block text-gray-900 dark:text-gray-100 bg-transparent outline-none"
          aria-labelledby="book"
        />
        <ComboboxPopover portal={false} className={styles['search-popover']}>
          <ComboboxList
            className={styles['search-list']}
            aria-labelledby="book"
          >
            {bookResults.length > 0 ? (
              bookResults.map((book) => (
                <ComboboxOption
                  className={classnames(
                    styles['search-list-item'],
                    'px-2 py-4'
                  )}
                  key={book.code}
                  value={book.book_pt}
                />
              ))
            ) : (
              <ComboboxOption
                tabIndex={-1}
                className={styles['search-list-item']}
                value="No Results"
              />
            )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
