class Book {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class User {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Library {
    books: Book[] = [];
    users: User[] = [];

    public addBook(book: Book): void {
        this.books.push(book);
    }

    public showAllBook(): void {
        this.books.forEach(book => {
            console.log(book.name);
        })
    }
}

const library = new Library();

const book1 = new Book("Clean Code");
const book2 = new Book("Design Patterns");

library.addBook(book1);
library.addBook(book2);

library.showAllBook();