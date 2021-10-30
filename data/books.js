const books = [
  {
    id: '28',
    book_pt: 'Gênesis',
    book: 'Genesis',
    code: 'GEN',
    chapters: 50
  },
  {
    id: '29',
    book_pt: 'Êxodo',
    book: 'Exodus',
    code: 'EXO',
    chapters: 40
  },
  {
    id: '30',
    book_pt: 'Levítico',
    book: 'Leviticus',
    code: 'LEV',
    chapters: 27
  },
  {
    id: '31',
    book_pt: 'Números',
    book: 'Numbers',
    code: 'NUM',
    chapters: 36
  },
  {
    id: '32',
    book_pt: 'Deuteronômio',
    book: 'Deuteronomy',
    code: 'DEU',
    chapters: 34
  },
  {
    id: '33',
    book_pt: 'Josué',
    book: 'Joshua',
    code: 'JOS',
    chapters: 24
  },
  {
    id: '34',
    book_pt: 'Juízes',
    book: 'Judges',
    code: 'JDG',
    chapters: 21
  },
  {
    id: '35',
    book_pt: 'Rute',
    book: 'Ruth',
    code: 'RUT',
    chapters: 4
  },
  {
    id: '36',
    book_pt: 'I Samuel',
    book: '1 Samuel',
    code: '1SA',
    chapters: 31
  },
  {
    id: '37',
    book_pt: 'II Samuel',
    book: '2 Samuel',
    code: '2SA',
    chapters: 24
  },
  {
    id: '38',
    book_pt: 'I Reis',
    book: '1 Kings',
    code: '1KI',
    chapters: 22
  },
  {
    id: '39',
    book_pt: 'II Reis',
    book: '2 Kings',
    code: '2KI',
    chapters: 25
  },
  {
    id: '40',
    book_pt: 'I Crônicas',
    book: '1 Chronicles',
    code: '1CH',
    chapters: 29
  },
  {
    id: '41',
    book_pt: 'II Crônicas',
    book: '2 Chronicles',
    code: '2CH',
    chapters: 36
  },
  {
    id: '42',
    book_pt: 'Esdras',
    book: 'Ezra',
    code: 'EZR',
    chapters: 10
  },
  {
    id: '43',
    book_pt: 'Neemias',
    book: 'Nehemiah',
    code: 'NEH',
    chapters: 13
  },
  {
    id: '44',
    book_pt: 'Ester',
    book: 'Esther',
    code: 'EST',
    chapters: 10
  },
  {
    id: '45',
    book_pt: 'Jó',
    book: 'Job',
    code: 'JOB',
    chapters: 42
  },
  {
    id: '46',
    book_pt: 'Salmos',
    book: 'Psalm',
    code: 'PSA',
    chapters: 150
  },
  {
    id: '47',
    book_pt: 'Provérbios',
    book: 'Proverbs',
    code: 'PRO',
    chapters: 31
  },
  {
    id: '48',
    book_pt: 'Eclesiastes',
    book: 'Ecclesiastes',
    code: 'ECC',
    chapters: 12
  },
  {
    id: '49',
    book_pt: 'Cantares de Salomão',
    book: 'Song of Solomon',
    code: 'SNG',
    chapters: 8
  },
  {
    id: '50',
    book_pt: 'Isaías',
    book: 'Isaiah',
    code: 'ISA',
    chapters: 66
  },
  {
    id: '51',
    book_pt: 'Jeremias',
    book: 'Jeremiah',
    code: 'JER',
    chapters: 52
  },
  {
    id: '52',
    book_pt: 'Lamentações de Jeremias',
    book: 'Lamentations',
    code: 'LAM',
    chapters: 5
  },
  {
    id: '53',
    book_pt: 'Ezequiel',
    book: 'Ezekiel',
    code: 'EZK',
    chapters: 48
  },
  {
    id: '54',
    book_pt: 'Daniel',
    book: 'Daniel',
    code: 'DAN',
    chapters: 12
  },
  {
    id: '55',
    book_pt: 'Oseias',
    book: 'Hosea',
    code: 'HOS',
    chapters: 14
  },
  {
    id: '56',
    book_pt: 'Joel',
    book: 'Joel',
    code: 'JOL',
    chapters: 3
  },
  {
    id: '57',
    book_pt: 'Amós',
    book: 'Amos',
    code: 'AMO',
    chapters: 9
  },
  {
    id: '58',
    book_pt: 'Obadias',
    book: 'Obadiah',
    code: 'OBA',
    chapters: 1
  },
  {
    id: '59',
    book_pt: 'Jonas',
    book: 'Jonah',
    code: 'JON',
    chapters: 4
  },
  {
    id: '60',
    book_pt: 'Miqueias',
    book: 'Micah',
    code: 'MIC',
    chapters: 7
  },
  {
    id: '61',
    book_pt: 'Naum',
    book: 'Nahum',
    code: 'NAM',
    chapters: 3
  },
  {
    id: '62',
    book_pt: 'Habacuque',
    book: 'Habakkuk',
    code: 'HAB',
    chapters: 3
  },
  {
    id: '63',
    book_pt: 'Sofonias',
    book: 'Zephaniah',
    code: 'ZEP',
    chapters: 3
  },
  {
    id: '64',
    book_pt: 'Ageu',
    book: 'Haggai',
    code: 'HAG',
    chapters: 2
  },
  {
    id: '65',
    book_pt: 'Zacarias',
    book: 'Zechariah',
    code: 'ZEC',
    chapters: 14
  },
  {
    id: '66',
    book_pt: 'Malaquias',
    book: 'Malachi',
    code: 'MAL',
    chapters: 4
  },
  {
    id: '1',
    book_pt: 'Mateus',
    book: 'Matthew',
    code: 'MAT',
    chapters: 28
  },
  {
    id: '2',
    book_pt: 'Marcos',
    book: 'Mark',
    code: 'MRK',
    chapters: 16
  },
  {
    id: '3',
    book_pt: 'Lucas',
    book: 'Luke',
    code: 'LUK',
    chapters: 24
  },
  {
    id: '4',
    book_pt: 'João',
    book: 'John',
    code: 'JHN',
    chapters: 21
  },
  {
    id: '5',
    book_pt: 'Atos',
    book: 'Acts',
    code: 'ACT',
    chapters: 28
  },
  {
    id: '6',
    book_pt: 'Romanos',
    book: 'Romans',
    code: 'ROM',
    chapters: 16
  },
  {
    id: '7',
    book_pt: 'I Coríntios',
    book: '1 Corinthians',
    code: '1CO',
    chapters: 16
  },
  {
    id: '8',
    book_pt: 'II Coríntios',
    book: '2 Corinthians',
    code: '2CO',
    chapters: 13
  },
  {
    id: '9',
    book_pt: 'Gálatas',
    book: 'Galatians',
    code: 'GAL',
    chapters: 6
  },
  {
    id: '10',
    book_pt: 'Efésios',
    book: 'Ephesians',
    code: 'EPH',
    chapters: 6
  },
  {
    id: '11',
    book_pt: 'Filipenses',
    book: 'Philippians',
    code: 'PHP',
    chapters: 4
  },
  {
    id: '12',
    book_pt: 'Colossenses',
    book: 'Colossians',
    code: 'COL',
    chapters: 4
  },
  {
    id: '13',
    book_pt: 'I Tessalonicenses',
    book: '1 Thessalonians',
    code: '1TH',
    chapters: 5
  },
  {
    id: '14',
    book_pt: 'II Tessalonicenses',
    book: '2 Thessalonians',
    code: '2TH',
    chapters: 3
  },
  {
    id: '15',
    book_pt: 'I Timóteo',
    book: '1 Timothy',
    code: '1TI',
    chapters: 6
  },
  {
    id: '16',
    book_pt: 'II Timóteo',
    book: '2 Timothy',
    code: '2TI',
    chapters: 4
  },
  {
    id: '17',
    book_pt: 'Tito',
    book: 'Titus',
    code: 'TIT',
    chapters: 3
  },
  {
    id: '18',
    book_pt: 'Filemom',
    book: 'Philemon',
    code: 'PHM',
    chapters: 1
  },
  {
    id: '19',
    book_pt: 'Hebreus',
    book: 'Hebrews',
    code: 'HEB',
    chapters: 13
  },
  {
    id: '20',
    book_pt: 'Tiago',
    book: 'James',
    code: 'JAS',
    chapters: 5
  },
  {
    id: '21',
    book_pt: 'I Pedro',
    book: '1 Peter',
    code: '1PE',
    chapters: 5
  },
  {
    id: '22',
    book_pt: 'II Pedro',
    book: '2 Peter',
    code: '2PE',
    chapters: 3
  },
  {
    id: '23',
    book_pt: 'I João',
    book: '1 John',
    code: '1JN',
    chapters: 5
  },
  {
    id: '24',
    book_pt: 'II João',
    book: '2 John',
    code: '2JN',
    chapters: 1
  },
  {
    id: '25',
    book_pt: 'III João',
    book: '3 John',
    code: '3JN',
    chapters: 1
  },
  {
    id: '26',
    book_pt: 'Judas',
    book: 'Jude',
    code: 'JUD',
    chapters: 1
  },
  {
    id: '27',
    book_pt: 'Apocalipse',
    book: 'Revelation',
    code: 'REV',
    chapters: 22
  }
];

export default books;
