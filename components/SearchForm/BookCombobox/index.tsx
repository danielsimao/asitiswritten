import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import classnames from 'classnames';
import {
  ChangeEvent,
  ChangeEventHandler,
  Ref,
  useEffect,
  useState
} from 'react';
import { autocompleteMatch } from '../../../utils';
import styles from './BookCombobox.module.css';

export type BookComboboxProps = {
  value?: string;
  results: any;
  inputRef: Ref<HTMLInputElement>;
  onSelect: (item: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export default function BookCombobox({
  value = '',
  results,
  inputRef,
  onSelect,
  onFocus,
  onBlur,
  onClick,
  onChange
}: BookComboboxProps) {
  const [search, setSearch] = useState(value);
  const [isReady, setReady] = useState(false);
  const bookResults = autocompleteMatch(results, search);

  function handleSelect(item: string) {
    setSearch(item);
    onSelect(item);
  }

  function handleClick() {
    onClick?.();
    setReady(true);
  }

  useEffect(() => {
    setSearch(value);
    setReady(false);
  }, [value]);

  return (
    <>
      <Combobox
        className="hidden md:block"
        onSelect={(item) => handleSelect(item)}
        openOnFocus
      >
        <ComboboxInput
          value={search}
          onClick={handleClick}
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
          className="text-sm placeholder:font-light w-full md:w-auto block text-black  dark:text-gray-100 bg-transparent outline-none leading-none"
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
