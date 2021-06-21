import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useState } from 'react';
import OldTestmant from '../data/old-testamant';
import NewTestmant from '../data/new-testamant';

export default function Search(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [book, setBook] = useState(null);

  const OldTestmentItems = OldTestmant.filter((e) =>
    search ? e.includes(search) : true
  ).map((item) => (
    <li
      onClick={() => setBook({ testament: 'Old', name: item.book })}
      key={item.book}
      className="px-4 h-14 flex items-center"
    >
      {item.book}
    </li>
  ));
  const NewTestmentItems = NewTestmant.filter((e) =>
    search ? e.includes(search) : true
  ).map((item) => (
    <li
      onClick={() => setBook({ testament: 'New', name: item.book })}
      key={item.book}
      className="px-4 h-14 flex items-center"
    >
      {item.book}
    </li>
  ));

  const BookEntry = () => (
    <>
      <div className="px-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-14 outline-none p-0 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
          placeholder="Search..."
        ></input>
      </div>
      <div className="search-list h-80 text-gray-900 dark:text-gray-100 overflow-y-auto">
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

  const chapters = book
    ? (book.testament === 'Old' ? OldTestmant : NewTestmant).filter(
        (item) => item.book === book.name
      )
    : null;

  const ChapterEntry = () =>
    chapters.map((_, i) => (
      <button className="font-bold h-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28">
        {i}
      </button>
    ));

  return (
    <div>
      <div>
        <input
          className="h-10"
          onClick={() => setIsOpen(true)}
          placeholder="Choose a book"
        ></input>
        <input className="h-10" placeholder="Choose a chapter..."></input>
        <button className="font-bold h-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28">
          Go!
        </button>
      </div>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent
          className="overflow-hidden"
          style={{
            margin: '20vh auto'
          }}
        >
          {!book ? <BookEntry></BookEntry> : null}
          {book && !chapters ? <ChapterEntry></ChapterEntry> : null}
        </DialogContent>
      </DialogOverlay>
    </div>
  );
}
