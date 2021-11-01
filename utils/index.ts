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
