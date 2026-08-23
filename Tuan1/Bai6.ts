class Book {
    title: string;
    author: string;
    year: number;
  
    constructor(title: string, author: string, year: number) {
      this.title = title;
      this.author = author;
      this.year = year;
    }
  
    displayBookInfo(): void {
      console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`);
    }
  }
  
  // Khởi tạo đối tượng sách và kiểm thử
  const myBook = new Book("Lập Trình Thiết Bị Di Động", "Nguyen Tran Xuan Dung", 2024);
  myBook.displayBookInfo();