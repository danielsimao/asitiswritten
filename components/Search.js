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
      <div className="w-96 flex rounded-md bg-white dark:bg-gray-800 relative">
        <div className="w-30">
          <label className="text-sm text-gray-900 dark:text-gray-100">
            Book
          </label>
          <input
            className="px-4 py-2 mt-1 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={search.value || null}
            onClick={() => setIsOpen(true)}
            placeholder="Choose a book..."
          ></input>
        </div>
        <div className="w-20">
          <label className="text-sm text-gray-900 dark:text-gray-100">
            Chapter
          </label>
          <input
            className="px-4 py-2 mt-1 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Choose a chatper..."
          ></input>
        </div>
        <button
          onClick={() =>
            router.push(`acf/${search.value.toLowerCase()}/${search.chapter}`)
          }
          className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
        >
          Go!
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
