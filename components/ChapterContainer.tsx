import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import books from '../data/bible-books';
import { findBookByCode, findBookSiblingByCode } from '../utils';
import Search from './Search';
import SearchDialog from './Search/Dialog';

export default function Container(props: any) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSearchDialogOpen, setSearchDialog] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const chapter = Number(router.query.chapter);

  const book = findBookByCode(router.query.book as string, books);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const meta = {
    title: 'The Bible',
    description: `Bible`,
    type: 'website',
    ...customMeta
  };

  const handleChangeChapter = (type: 'prev' | 'next') => {
    if (!book) return;

    const { version } = router.query;
    const nextChapter = type === 'next' ? chapter + 1 : chapter - 1;

    if (nextChapter > 0 && nextChapter <= book.chapters) {
      return router.push({
        pathname: router.pathname,
        query: {
          version,
          book: book.code.toLowerCase(),
          chapter: nextChapter
        }
      });
    }

    const siblingBook = findBookSiblingByCode(
      book.code.toLowerCase() as string,
      type,
      books
    );

    return router.push({
      pathname: router.pathname,
      query: {
        version,
        book: siblingBook.code.toLowerCase(),
        chapter: type === 'next' ? 1 : siblingBook.chapters
      }
    });
  };

  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="The Bible" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <nav className="flex items-center gap-2 md:gap-0 md:justify-between w-full max-w-4xl p-2 md:py-3 md:px-8 mx-auto my-0 text-gray-900 bg-white sticky-nav dark:bg-black bg-opacity-60 dark:text-gray-100">
        <button
          onClick={() => router.push('/')}
          className="hidden md:block text-4xl w-12 h-12 font-bold"
        >
          B.
        </button>
        <button
          onClick={() => router.push('/')}
          className="text-black dark:text-white p-3 md:hidden"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => setSearchDialog(true)}
          className="md:hidden bg-gray-200 dark:bg-gray-800 py-3 rounded-full flex-1 flex justify-center items-center"
        >
          <span>
            {book?.book_pt} {router.query.chapter}
          </span>
        </button>

        <div className="hidden md:block">
          <Search book={book?.book_pt} chapter={chapter} />
        </div>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-10 h-10 p-3 md:bg-gray-200 md:rounded md:dark:bg-gray-800"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="w-4 h-4 text-gray-800 dark:text-gray-200"
            >
              {resolvedTheme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
      </nav>
      <main
        id="skip"
        className="flex flex-col justify-center px-6 bg-white dark:bg-black"
      >
        {children}
        <div>
          <button
            onClick={() => handleChangeChapter('prev')}
            className="fixed text-black dark:text-white bottom-2 left-2 rounded-full bg-gray-200 dark:bg-gray-800 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => handleChangeChapter('next')}
            className="fixed text-black dark:text-white bottom-2 right-2 rounded-full bg-gray-200 dark:bg-gray-800 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </main>
      <SearchDialog
        isOpen={isSearchDialogOpen}
        onCompleteForm={(form) => {
          router.push({
            pathname: router.pathname,
            query: {
              version: router.query.version,
              book: form.book.code.toLowerCase(),
              chapter: form.chapter
            }
          });
        }}
        onClose={() => setSearchDialog(false)}
      />
    </div>
  );
}
