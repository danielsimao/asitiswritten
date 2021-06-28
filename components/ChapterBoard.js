export default function ChapterBoard(props) {
  const { value, book, onBack, onSelect } = props;

  return (
    <div className="relative py-14 h-full">
      <div className="flex justify-between items-center h-14 px-2 border border-gray-200 dark:border-gray-800 fixed inset-0 w-full">
        <button onClick={onBack} className="p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-900 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="font-bold self-center text-lg text-gray-900 dark:text-gray-100">
          {book.name}
        </div>
        <span className="w-10 h-10 inline-block"></span>
      </div>
      <div className="h-full w-full overflow-y-auto pt-5 pb-14">
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(book.chapters)].map((_, i) => (
            <div
              onClick={() => {
                onSelect(i + 1);
              }}
              key={i}
              className={`flex items-center justify-center font-bold h-12 w-12 text-gray-900 dark:text-gray-100 rounded-full w-10 ${
                value === i + 1 ? 'bg-gray-200 dark:bg-gray-800' : ''
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
