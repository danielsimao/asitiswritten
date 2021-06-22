import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useState } from 'react';

import { useRouter } from 'next/router';
import BookAutoComplete from './BookAutoComplete';
import ChapterBoard from './ChapterBoard';

export default function Search(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState({
    value: '',
    testament: null,
    chapters: null,
    chapter: null
  });
  const [step, setStep] = useState(0);

  return (
    <>
      <div className="flex rounded-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full">
        <div className="w-30 px-6 py-3">
          <label className="text-xs text-gray-900 dark:text-gray-100">
            Book
          </label>
          <input
            readOnly
            className="block w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            value={search.value || ''}
            onClick={() => setIsOpen(true)}
            placeholder="Choose a book..."
          ></input>
        </div>
        <div className="h-10 border-r border-gray-200 dark:border-gray-800 self-center" />
        <div className="w-22 px-6 py-3">
          <label className="text-xs text-gray-900 dark:text-gray-100">
            Chapter
          </label>
          <input
            className="block w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            placeholder="Choose a chatper..."
          ></input>
        </div>
        <button
          className="font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-full self-center mr-2"
          onClick={() =>
            router.push(`acf/${search.value.toLowerCase()}/${search.chapter}`)
          }
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
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent
          aria-label="search-dialog"
          className="overflow-hidden"
          style={{
            margin: '20vh auto'
          }}
        >
          {step === 0 ? (
            <BookAutoComplete
              onClear={() => setSearch({ value: '' })}
              search={search}
              onSelect={(e) => {
                setSearch(e);
                setStep(1);
              }}
              onChange={(e) => setSearch({ value: e.target.value })}
            />
          ) : null}
          {step === 1 ? (
            <ChapterBoard
              onBack={() => {
                setStep(0);
              }}
              onSelect={(c) => {
                setSearch((e) => ({ ...e, chapter: c }));
                setIsOpen(false);
              }}
              search={search}
            />
          ) : null}
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
