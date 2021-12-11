import { BibleBook } from '../data/bible-books';

export function autocompleteMatch(search_terms: any[], input: string) {
  if (input == '') {
    return search_terms;
  }
  var reg = new RegExp(input, 'i');
  return search_terms.filter(function (term) {
    if (term.book_pt.match(reg) || term.book_pt_norm.match(reg)) {
      return term;
    }
  });
}

export function findBookByName(
  name: string,
  books: BibleBook[],
  isCloseMatch?: boolean
) {
  return books.find((book) =>
    isCloseMatch
      ? book.book_pt.match(new RegExp(name, 'i'))
      : book.book_pt === name
  );
}

export function findBookByCode(code: string, books: BibleBook[]) {
  return books.find((book) => book.code.toLowerCase() === code);
}

export function findBookSiblingByCode(
  code: string,
  sibling: 'next' | 'prev',
  books: BibleBook[]
) {
  const bookIndex = books.findIndex((book) => book.code.toLowerCase() === code);

  const maxBookIndex = books.length - 1;

  if (bookIndex === 0 && sibling === 'prev') {
    return books[maxBookIndex];
  } else if (bookIndex === maxBookIndex && sibling === 'next') {
    return books[0];
  } else {
    return books[sibling === 'next' ? bookIndex + 1 : bookIndex - 1];
  }
}
