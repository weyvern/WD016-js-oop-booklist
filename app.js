class Book {
  constructor(title, genre, author, read, date) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.read = read || false;
    this.readDate = date || null;
  }
}

class BookList {
  #books;
  #booksRead;
  #booksNotRead;
  #nextBook;
  #currentBook;
  #lastBook;
  constructor(books = []) {
    this.#books = books;
    this.init();
  }

  init() {
    console.log('Init');
    this.setReadCount();
  }

  get allBooks() {
    return this.#books;
  }

  get booksRead() {
    return this.#booksRead;
  }

  get booksNotRead() {
    return this.#booksNotRead;
  }

  get nextBook() {
    return this.#nextBook;
  }

  get currentBook() {
    return this.#currentBook;
  }

  get lastBook() {
    return this.#lastBook;
  }

  setReadCount() {
    // Refactor to use reduce
    this.#booksRead = this.#books.filter(book => book.read).length;
    this.#booksNotRead = this.#books.filter(book => !book.read).length;
    this.#nextBook = this.#books.find(book => !book.read);
  }

  addBook(book) {
    /* const newBook = new Book(book.title, book.genre, book.author); */
    this.#books.push(book);
    this.setReadCount();
  }

  setCurrentBook(name) {
    this.#currentBook = this.#books.find(book => book.title === name && book);
  }

  finishCurrentBook() {
    this.#books = this.#books.map(book =>
      book.title === this.#currentBook.title
        ? new Book(book.title, book.genre, book.author, true, Date.now())
        : book
    );
    this.#lastBook = this.#currentBook;
    this.#currentBook = this.#books.find(book => !book.read);
    this.setReadCount();
  }
}

// Create books
const lotr = new Book('LotR I', 'Fantasy', 'JRR Tolkien');
const hp = new Book('HP', 'Fantasy', 'JK Rowling');
const dune = new Book('Dune', 'Sci/Fi', 'Frank Herbert');
const quijote = new Book(
  'The Ingenious Gentleman Don Quixote of La Mancha, or just Don Quixote',
  'Novel',
  'Miguel de Cervantes'
);
const sciad = new Book('Scientific Advertising', 'Marketing', 'Claude Hopkins');

// Create booklist
const myBookShelf = new BookList([lotr, hp, dune]);

/* myBookShelf.#books = 'Robbed'; */

// Test booklist methods
myBookShelf.addBook(quijote);
myBookShelf.addBook(sciad);
myBookShelf.setCurrentBook('HP');
console.log(myBookShelf.currentBook);
console.log(myBookShelf.nextBook);
console.log(myBookShelf.finishCurrentBook());
console.log(myBookShelf.currentBook);

console.log(myBookShelf);
