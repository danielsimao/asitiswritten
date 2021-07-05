import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import NewTestmant from '../data/new-testamant';
import OldTestmant from '../data/old-testamant';
import Modal from './Modal';

function AutoCompleteItem(props) {
  const { book, onSelect } = props;
  return (
    <li onClick={() => onSelect(book)} className="px-4 h-14 flex items-center">
      {book.name}
    </li>
  );
}

export default function Search(props) {
  const bookInputRef = useRef();
  const chapterInputRef = useRef();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    book: null,
    chapter: null,
    complete: false
  });
  const [step, setStep] = useState(0);

  function handleBookSelect(book) {
    setSearch(book.name);
    setForm({ book });
    setStep(1);
    setOpen(true);
  }

  function handleChapterSelect(chapter) {
    setForm((s) => ({ ...s, chapter, complete: true }));
  }

  function handleChange(value) {
    setSearch(value);
  }

  function handleSearch() {
    router.push(`acf/${form.book.name.toLowerCase()}/${form.chapter}`);
  }

  const OldTestmentItems = OldTestmant.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  ).map((book) => (
    <AutoCompleteItem key={book.name} book={book} onSelect={handleBookSelect} />
  ));

  const NewTestmentItems = NewTestmant.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  ).map((book) => (
    <AutoCompleteItem key={book.name} book={book} onSelect={handleBookSelect} />
  ));

  const handleOutsideClick = useCallback(
    (e) => {
      const ref = step === 0 ? bookInputRef : chapterInputRef;
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    },
    [step]
  );

  function handleClickBookInput() {
    setOpen(true);
    setStep(0);
    bookInputRef.current?.querySelector('input').focus();
  }

  function handleClickChapterInput() {
    setOpen(true);
    if (!form.book) {
      handleClickBookInput();
    } else {
      setStep(1);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick, isOpen]);

  return (
    <div className="hidden relative md:flex rounded-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full">
      <div
        onClick={handleClickBookInput}
        ref={bookInputRef}
        className="w-30 px-6 py-3"
      >
        <label className="text-xs text-gray-900 dark:text-gray-100">Book</label>
        <input
          className="block w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-gray-100"
          value={search}
          placeholder="Choose a book..."
          onChange={(e) => handleChange(e.target.value)}
        ></input>
      </div>
      <div className="h-10 border-r border-gray-200 dark:border-gray-800 self-center" />
      <div
        ref={chapterInputRef}
        onClick={handleClickChapterInput}
        className="w-22 px-6 py-3"
      >
        <label className="text-xs text-gray-900 dark:text-gray-100">
          Chapter
        </label>
        <input
          onChange={(e) =>
            setForm((s) => ({ ...s, chapter: Number(e.target.value) }))
          }
          value={form.chapter ?? ''}
          className="block w-full rounded-md bg-white dark:bg-black text-gray-900 dark:text-gray-100"
          placeholder="Choose a chatper..."
        ></input>
      </div>
      <button
        className="font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-full self-center mr-2"
        onClick={handleSearch}
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
      <Modal
        onDismiss={() => setOpen(false)}
        style={{
          borderRadius: '2rem'
        }}
        className="top-full left-0 mt-5 h-80 w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg"
        isOpen={isOpen}
      >
        <div className="text-gray-900 dark:text-gray-100 h-full w-full overflow-y-auto">
          {step === 0 ? (
            <ul>
              <li>
                <div className="text-xs px-5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  Old Testmant
                </div>
                <ul>{OldTestmentItems}</ul>
              </li>
              <li>
                <div className="text-xs px-5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  New Testmant
                </div>
                <ul>{NewTestmentItems}</ul>
              </li>
            </ul>
          ) : null}
          {step === 1 ? (
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {[...Array(form.book.chapters)].map((_, i) => (
                <div
                  onClick={() => {
                    handleChapterSelect(i + 1);
                  }}
                  key={i}
                  className={`flex items-center justify-center font-bold h-12 w-12 text-gray-900 dark:text-gray-100 rounded-full w-10 ${
                    form.chapter === i + 1 ? 'bg-gray-200 dark:bg-gray-800' : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
