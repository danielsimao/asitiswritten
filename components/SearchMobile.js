import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useState } from 'react';
import BookAutoComplete from './BookAutoComplete';
import ChapterBoard from './ChapterBoard';
import { useRouter } from 'next/router';

export default function SearchMobile() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    book: null,
    chapter: null
  });
  const [step, setStep] = useState(0);

  function handleBookSelect(book) {
    setForm({ book });
    setStep(1);
  }

  function handleChapterSelect(chapter) {
    setForm((s) => ({ ...s, chapter }));
  }

  function handleSearchClear() {
    setSearch('');
  }

  function handleBack() {
    if (step === 0) {
      setOpen(false);
    } else {
      setStep((s) => s - 1);
    }
  }

  function handleChange(value) {
    setSearch(value);
  }

  function handleSearch() {
    router.push(`acf/${form.book.name.toLowerCase()}/${form.chapter}`);
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full rounded-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full relative px-1 py-2"
      >
        <input
          readOnly
          className="block w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-gray-100"
        ></input>
        <div
          style={{ transform: 'translate(-50%,-50%)' }}
          className="flex justify-center items-center absolute w-full top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 text-gray-900 dark:text-gray-100 text-lg md:text-xl font-medium "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          What are you searching?
        </div>
      </div>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent aria-label="search-dialog" className="overflow-hidden">
          {step === 0 ? (
            <BookAutoComplete
              onBack={handleBack}
              onClear={handleSearchClear}
              value={search}
              onSelect={handleBookSelect}
              onChange={handleChange}
            />
          ) : null}
          {step === 1 ? (
            <ChapterBoard
              value={form.chapter}
              book={form.book}
              onBack={handleBack}
              onSelect={handleChapterSelect}
              onSearch={handleSearch}
            />
          ) : null}
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
