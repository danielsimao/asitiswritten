export default function ChapterBoard(props) {
  const { search, onBack, onSelect } = props;
  return (
    <>
      <div className="flex justify-between items-center px-4 w-full h-10 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800">
        <button onClick={onBack} className={`w-10 h-10`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 24, width: 24 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <span>
          Choose a chapter of <strong>{search.value}</strong>
        </span>
        <span className="w-10 h-10 inline-block"></span>
      </div>

      <div
        style={{ flexWrap: 'wrap' }}
        className="flex justify-center gap-4 p-4"
      >
        {[...Array(search.chapters)].map((_, i) => (
          <button
            onClick={() => onSelect(i + 1)}
            key={i}
            className="font-bold h-10 text-gray-900 dark:text-gray-100 rounded w-10"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
