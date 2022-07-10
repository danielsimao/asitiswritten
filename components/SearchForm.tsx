import cn from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import books, { BibleBook } from '../data/bible-books';
import BookCombobox from './BookCombobox';
import ChapterPopover from './ChapterPopover';
import SearchDialog from './Search/Dialog';

const normalizedBooks = books.map((book) => ({
  ...book,
  book_pt_norm: book.book_pt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}));

const Book = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-[#E28C5B]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

export type SearchForm = { book: BibleBook; chapter: string };

type Props = { variant?: 'main' | 'chapter' };

type NativeAttrs = Omit<React.HtmlHTMLAttributes<unknown>, keyof Props>;

type SearchFormProps = Props & NativeAttrs;

export default function SearchForm({
  variant = 'main',
  className
}: SearchFormProps) {
  const router = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [book, setBook] = useState<BibleBook | undefined>();

  const formRef = useRef<HTMLFormElement>(null);
  const bookRef = useRef<HTMLInputElement>(null);
  const chapterRef = useRef<HTMLInputElement>(null);

  const handleCompleteForm = (form: SearchForm) => {
    router.push(`/acf/${form.book?.code.toLowerCase()}/${form.chapter}`);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      book: e.currentTarget.book?.value,
      chapter: e.currentTarget.chapter?.value
    };

    if (!book) {
      return bookRef.current?.focus();
    }

    if (!body.chapter || body.chapter < 0 || body.chapter > book.chapters) {
      return chapterRef.current?.focus();
    }

    handleCompleteForm({ book, chapter: body.chapter });
  }

  const handleSelect = (book: BibleBook) => {
    setBook(book);
    return chapterRef.current?.focus();
  };

  useEffect(() => {
    if (book) {
      chapterRef.current?.focus();
    }
  }, [book]);

  const formattedOptions = normalizedBooks.map((option) => ({
    value: option,
    label: option.book_pt
  }));

  const labelClassName =
    'text-xs text-gray-900 dark:text-gray-100 font-semibold w-full';

  const inputClassName =
    'bg-transparent !text-sm !text-gray-900 !outline-none dark:text-gray-100 w-full placeholder:text-slate-400';

  return (
    <>
      <span
        onClick={() => setDialogOpen(true)}
        className={cn(
          'flex flex-1 justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-black md:hidden',
          { 'bg-gray-200 dark:bg-gray-800': variant === 'chapter' }
        )}
        tabIndex={0}
        role="button"
      >
        <Book /> O que vai ler?
      </span>
      <div className="hidden flex-1 justify-center md:flex">
        <form
          ref={formRef}
          autoComplete="off"
          onSubmit={handleSubmit}
          className={cn(
            'relative flex max-w-[450px] flex-auto items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-800 ',
            className
          )}
        >
          <div className="flex h-full flex-[1_0_0%] flex-col justify-center gap-[2px] rounded-full py-[10px] pr-4 pl-8 focus-within:shadow-[0px_6px_20px_rgb(0,0,0,0.3)]">
            <label className={labelClassName} htmlFor="book">
              Livro
            </label>
            <BookCombobox
              ref={bookRef}
              className={inputClassName}
              onSelect={handleSelect}
              options={formattedOptions}
              name="book"
              id="book"
              placeholder="O que vai ler?"
            />
          </div>
          <div className="my-2 mx-0 h-8 flex-[0_0_0%] border-l border-gray-300 dark:border-black" />
          <div className="flex flex-[1.5_0_0%] rounded-full focus-within:shadow-[0px_6px_20px_rgb(0,0,0,0.3)]">
            <div className="flex flex-1 flex-col justify-center gap-[2px] px-4 py-[10px]">
              <label className={labelClassName} htmlFor="chapter">
                Capítulo
              </label>
              <ChapterPopover
                ref={chapterRef}
                book={book}
                inputClassName={inputClassName}
                placeholder="O que vai ler?"
                name="chapter"
                id="chapter"
              />
            </div>
            <button
              type="submit"
              className="m-1 inline-flex flex-none items-center justify-center rounded-full bg-[#E28C5B] p-[14px]  text-white dark:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>
          </div>
        </form>
      </div>
      <SearchDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onCompleteForm={handleCompleteForm}
      />
    </>
  );
}
