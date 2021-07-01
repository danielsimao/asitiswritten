import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function Search(props) {
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
    setForm({ book });
    setStep(1);
  }

  const handleChapterSelect = (chapter) => {
    setForm((s) => ({ ...s, chapter, complete: true }));
  };

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

  const handleSearch = useCallback(
    (form) => {
      router.push(`acf/${form.book.name.toLowerCase()}/${form.chapter}`);
    },
    [router]
  );

  return (
    <div className=" hidden md:flex rounded-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full">
      <div className="w-30 px-6 py-3">
        <label className="text-xs text-gray-900 dark:text-gray-100">Book</label>
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
    </div>
  );
}
