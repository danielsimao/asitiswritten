import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import books from '../data/bible-books';
import useLocalStorage from '../lib/hooks/use-local-storage';
import { findBookByCode, findBookSiblingByCode } from '../utils';
import OptionsPopover, { OptionsPopoverProps } from './Chapter/OptionsPopover';
import Search from './Search';
import SearchDialog from './Search/Dialog';

const fonts = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl'
];

export default function Container(props: any) {
  const router = useRouter();
  const [isSearchDialogOpen, setSearchDialog] = useState(false);
  const [font, setFont] = useLocalStorage<number>('fontSize', 2);
  const chapter = Number(router.query.chapter);
  let versesContainerRef = useRef<Element | null>();

  const book = findBookByCode(router.query.book as string, books);

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

  const handleChangeFont: OptionsPopoverProps['onChangeFont'] = (font) => {
    if (font >= 0 && font <= fonts.length - 1) {
      setFont(font);
    }
  };

  useEffect(() => {
    versesContainerRef.current = document.querySelector('main #verses');
  }, []);

  useEffect(() => {
    versesContainerRef.current?.classList.add(fonts[font]);

    const previousClass = versesContainerRef.current?.classList.item(
      versesContainerRef.current?.classList.length - 2
    );
    versesContainerRef.current?.classList.remove(previousClass as string);
  }, [font]);

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
        <OptionsPopover font={font} onChangeFont={handleChangeFont} />
      </nav>
      <main
        id="chapter"
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
