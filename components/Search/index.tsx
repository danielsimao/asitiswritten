import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import books, { BibleBook } from '../../data/bible-books';
import { findBookByName } from '../../utils';
import BookCombobox, { BookComboboxProps } from './BookCombobox';
import ChapterInput from './ChapterInput';
import SearchDialog from './Dialog';

const normalizedBooks = books.map((book) => ({
  ...book,
  book_pt_norm: book.book_pt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}));

export type SearchForm = { book: BibleBook; chapter: string };

export default function Search({
  book: _book,
  chapter
}: {
  book?: string;
  chapter?: number;
}) {
  const router = useRouter();

  const [hasDivider, setDividerVisiblity] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [book, setBook] = useState<string | undefined>(_book);

  const formRef = useRef<HTMLFormElement>(null);
  const comboboxRef = useRef<HTMLInputElement>(null);
  const chapterInputRef = useRef<HTMLInputElement>(null);

  const handleCompleteForm = (form: SearchForm) => {
    router.push(`/acf/${form.book?.code.toLowerCase()}/${form.chapter}`);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      book: e.currentTarget.book.value,
      chapter: e.currentTarget.chapter.value
    };

    if (!body.book) {
      return comboboxRef.current?.focus();
    }

    const book = findBookByName(body.book, books, true);

    if (!book) {
      return;
    }

    if (!body.chapter || body.chapter < 0 || body.chapter > book.chapters) {
      return;
    }

    handleCompleteForm({ book, chapter: body.chapter });
  }

  function handleComboboxSelect(item: string) {
    setBook(item);
    setTimeout(() => chapterInputRef.current?.focus(), 0);
  }

  const handleChange: BookComboboxProps['onChange'] = (e) => {
    setBook(e.target.value);
  };

  // function handleKeyDown(event: any) {
  //   if (!event.isDefaultPrevented()) {
  //     const container = ref.current;
  //     if (!container) return;

  //     window.requestAnimationFrame(() => {
  //       const element = container.querySelector(
  //         '[aria-selected=true]'
  //       ) as HTMLDivElement;
  //       if (element) {
  //         const top = element.offsetTop - container.scrollTop;
  //         const bottom =
  //           container.scrollTop +
  //           container.clientHeight -
  //           (element.offsetTop + element.clientHeight);

  //         if (bottom < 0) container.scrollTop -= bottom;
  //         if (top < 0) container.scrollTop += top;
  //       }
  //     });
  //   }
  // }

  useEffect(() => {
    setBook(_book);
  }, [_book]);

  const labelClassName =
    'text-xs text-gray-900 dark:text-gray-100 font-semibold';

  return (
    <div className="border border-gray-300 dark:border-gray-800 rounded-lg md:rounded-full w-full md:w-auto bg-white dark:bg-gray-800">
      <form
        ref={formRef}
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-auto flex-col md:flex-row relative"
      >
        <div className="pl-4 md:pl-8 pr-4 py-2 md:rounded-full md:focus-within:shadow-[0px_6px_20px_rgb(0,0,0,0.3)] flex flex-col justify-center gap-1">
          <label className={labelClassName} htmlFor="book">
            Livro
          </label>
          <input
            onClick={() => setDialogOpen(true)}
            readOnly
            placeholder="O que vai ler?"
            className="text-sm w-full md:w-auto block md:hidden text-gray-900 dark:text-gray-100 bg-transparent outline-none"
          />
          <BookCombobox
            value={book}
            onChange={handleChange}
            onFocus={() => setDividerVisiblity(false)}
            onBlur={() => setDividerVisiblity(true)}
            onSelect={handleComboboxSelect}
            inputRef={comboboxRef}
            results={normalizedBooks}
          />
        </div>
        <div
          className={`border-t md:border-l mx-4 md:my-2 md:mx-0 border-gray-300 dark:border-black ${
            !hasDivider ? 'md:invisible' : ''
          }`}
        />
        <div className="flex flex-col md:flex-row md:rounded-full md:focus-within:shadow-[0px_6px_20px_rgb(0,0,0,0.3)]">
          <div className="px-4 py-2 flex flex-col justify-center gap-1">
            <label className={labelClassName} htmlFor="chapter">
              Capítulo
            </label>
            <ChapterInput
              value={chapter?.toString()}
              inputRef={chapterInputRef}
              onClick={() => {
                if (!book) {
                  comboboxRef.current?.click();
                  comboboxRef.current?.focus();
                }
              }}
              onFocus={() => {
                setDividerVisiblity(false);
              }}
              onBlur={() => {
                setDividerVisiblity(true);
              }}
              book={book}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center m-2 md:m-1 p-3 md:p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg md:rounded-full justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hidden md:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <span className="md:hidden">Search</span>
          </button>
        </div>
      </form>
      <SearchDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onCompleteForm={handleCompleteForm}
      />
    </div>
  );
}
