import '@reach/dialog/styles.css';
import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import books, { BibleBook } from '../../../data/bible-books';
import { autocompleteMatch, findBookByName } from '../../../utils';
import ChapterList from '../../ChapterList';
import Portal from '../../Portal';

const normalizedBooks = books.map((book) => ({
  ...book,
  book_pt_norm: book.book_pt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}));

function DialogHeader({
  children,
  onBack
}: PropsWithChildren<{ onBack: () => void }>) {
  return (
    <div className="relative flex flex-row flex items-center gap-2 px-3 py-2 border-b border-gray-300 dark:border-gray-800">
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

interface State {
  step: number;
  form: {
    book?: BibleBook;
    chapter?: number;
  };
}

type Action =
  | { type: 'back' }
  | { type: 'next'; form?: State['form'] }
  | { type: 'submit'; form?: State['form'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        step: state.step + 1,
        form: { ...state.form, ...action.form }
      };
    case 'submit':
      return {
        ...state,
        form: { ...state.form, ...action.form }
      };
    case 'back':
      return { ...state, step: state.step - 1 };
  }
}

const initialState: State = {
  step: 0,
  form: { book: undefined, chapter: undefined }
};

export default function SearchDialog({
  isOpen,
  onCompleteForm,
  onDismiss
}: {
  isOpen: boolean;
  onCompleteForm: (form: State['form']) => void;
  onDismiss: () => void;
}) {
  const [
    {
      form: { book },
      step
    },
    dispatch
  ] = useReducer(reducer, initialState);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const [topHeight, setTopHeight] = useState(0);
  const bookResults = autocompleteMatch(normalizedBooks, search);

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleOnCloseDialog() {
    dispatch({ type: 'back' });

    if (step === 1) {
      onDismiss();
    }
  }

  function handleChapterSelect(chapter: number) {
    onCompleteForm({ book, chapter });
  }

  function handleBookSelect(item: string) {
    const book = findBookByName(item, books);
    dispatch({ type: 'next', form: { book } });
  }

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'next' });
    }
  }, [isOpen]);

  return (
    <>
      <Portal>
        {step === 1 && (
          <div className="md:hidden w-screen h-screen fixed inset-0">
            <div className="w-full h-full overflow-hidden bg-white dark:bg-black">
              <DialogHeader onBack={handleOnCloseDialog}>
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
                id="test"
                ref={(el) =>
                  !topHeight &&
                  setTopHeight(
                    el?.previousElementSibling?.getBoundingClientRect()
                      .height || 61
                  )
                }
                className="border-gray-300 dark:border-0 overflow-auto"
                style={{
                  maxHeight: `calc(100vh - ${topHeight}px)`
                }}
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
          </div>
        )}
        {step === 2 && (
          <div className="md:hidden w-screen h-screen absolute inset-0">
            <div className="w-full h-full overflow-hidden bg-white dark:bg-black">
              <DialogHeader onBack={handleOnCloseDialog}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100">
                  {book?.book_pt}
                </div>
              </DialogHeader>

              <ChapterList
                onSelect={handleChapterSelect}
                chapterCount={book?.chapters}
              />
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}
