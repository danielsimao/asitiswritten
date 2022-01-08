import '@reach/dialog/styles.css';
import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';
import { SearchForm } from '..';
import books, { BibleBook } from '../../../data/bible-books';
import { autocompleteMatch, findBookByName } from '../../../utils';
import ChapterList from '../ChapterList';
import { Dialog } from '@headlessui/react';

const normalizedBooks = books.map((book) => ({
  ...book,
  book_pt_norm: book.book_pt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}));

function DialogHeader({
  children,
  onBack
}: PropsWithChildren<{ onBack: () => void }>) {
  return (
    <div className="relative flex-row flex items-center gap-2 px-3 py-2 border-b border-gray-300 dark:border-gray-800">
      <button onClick={onBack} className="text-gray-900 dark:text-gray-100 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {children}
    </div>
  );
}

export default function SearchDialog({
  isOpen,
  onCompleteForm,
  onClose
}: {
  isOpen: boolean;
  onCompleteForm: (form: SearchForm) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<{ book?: BibleBook; chapter?: number }>({
    book: undefined,
    chapter: undefined
  });
  const ref = useRef<HTMLInputElement>(null);
  const bookResults = autocompleteMatch(normalizedBooks, search);

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleBookBack() {
    setForm({ book: undefined, chapter: undefined });
    onClose();
  }

  function handleChapterSelect(chapter: string) {
    onCompleteForm({ book: form.book as BibleBook, chapter });
    setForm({ book: undefined, chapter: undefined });
    onClose();
  }

  function handleBookSelect(item: string) {
    const book = findBookByName(item, books);
    setForm((s) => ({ ...s, book }));
  }

  function handleChapterBack() {
    setForm({ book: undefined, chapter: undefined });
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      className="fixed inset-0 "
      initialFocus={ref}
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Overlay />
      {!form.book && (
        <div className="w-full h-full overflow-hidden bg-white dark:bg-black">
          <DialogHeader onBack={handleBookBack}>
            <input
              value={search}
              ref={ref}
              id="book"
              name="book"
              placeholder="Pesquisa"
              onChange={handleChangeInput}
              className="mobile-search-input text-base block w-full md:w-auto text-gray-900 dark:text-gray-100 bg-transparent outline-none"
              aria-labelledby="book"
              autoComplete="off"
              autoFocus
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  ref.current?.focus();
                }}
                className="text-gray-900 dark:text-gray-100 p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </DialogHeader>
          <div
            className="border-gray-300 dark:border-0 overflow-auto"
            style={{ maxHeight: 'calc(100% - 61px)' }}
            aria-labelledby="book"
          >
            {bookResults.length > 0 ? (
              bookResults.map((book: any) => (
                <div
                  tabIndex={0}
                  className="px-2 py-4 text-base bg-white text-gray-900 px-10 py-3 dark:bg-black dark:text-gray-100 hover:bg-gray-100 hover:dark:bg-gray-900"
                  key={book.code}
                  onClick={() => handleBookSelect(book.book_pt)}
                >
                  {book.book_pt}
                </div>
              ))
            ) : (
              <div
                tabIndex={-1}
                className="px-2 py-4 text-base bg-white text-gray-900 px-10 py-3 dark:bg-black dark:text-gray-100"
              >
                No Results
              </div>
            )}
          </div>
        </div>
      )}
      {form.book && !form.chapter && (
        <div className="w-full h-full overflow-hidden bg-white dark:bg-black">
          <DialogHeader onBack={handleChapterBack}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100">
              {form.book.book_pt}
            </div>
          </DialogHeader>
          <ChapterList
            onSelect={handleChapterSelect}
            chapterCount={form.book?.chapters}
          />
        </div>
      )}
    </Dialog>
  );
}
