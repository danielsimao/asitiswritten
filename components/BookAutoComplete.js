import OldTestmant from '../data/old-testamant';
import NewTestmant from '../data/new-testamant';
import Fuse from 'fuse.js';

// desktop autocomplete https://material-ui.com/components/autocomplete/#useautocomplete

export default function BookAutoComplete(props) {
  const { search, onChange, onSelect, onClear, onBack } = props;

  const oldTestmantSearch = new Fuse(OldTestmant, {
    isCaseSensitive: false,
    keys: ['book']
  }).search(search.value);
  const newTestmantSearch = new Fuse(NewTestmant, {
    isCaseSensitive: false,
    keys: ['book']
  }).search(search.value);

  console.log(oldTestmantSearch, newTestmantSearch);

  const OldTestmentItems = OldTestmant.filter((e) =>
    e.book.toLowerCase().includes(search.value.toLowerCase())
  ).map((item) => (
    <li
      onClick={() =>
        onSelect({
          testament: 'Old',
          value: item.book,
          chapters: item.chapters
        })
      }
      key={item.book}
      className="px-4 h-14 flex items-center"
    >
      {item.book}
    </li>
  ));
  const NewTestmentItems = NewTestmant.filter((e) =>
    e.book.toLowerCase().includes(search.value.toLowerCase())
  ).map((item) => (
    <li
      onClick={() =>
        onSelect({
          testament: 'New',
          value: item.book,
          chapters: item.chapters
        })
      }
      key={item.book}
      className="px-4 h-14 flex items-center"
    >
      {item.book}
    </li>
  ));

  return (
    <>
      <div
        style={{ position: 'relative' }}
        className="flex px-2 border-t border-gray-200 dark:border-gray-800 relative"
      >
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
        <input
          value={search.value}
          onChange={onChange}
          className="w-full h-14 outline-none pl-2 pr-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
          placeholder="Search..."
        ></input>
        <button
          onClick={onClear}
          style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translate(0,-50%)',
            visibility: search.value ? '' : 'hidden'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-900 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="search-list h-full text-gray-900 dark:text-gray-100 overflow-y-auto">
        <ul>
          <li>
            <div className="text-xs px-5 py-1 bg-gray-800">Old Testmant</div>
            <ul>{OldTestmentItems}</ul>
          </li>
          <li>
            <div className="text-xs px-5 py-1 bg-gray-800">New Testmant</div>
            <ul>{NewTestmentItems}</ul>
          </li>
        </ul>
      </div>
    </>
  );
}
