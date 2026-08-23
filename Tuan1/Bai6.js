var Book = /** @class */ (function () {
    function Book(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    Book.prototype.displayBookInfo = function () {
        console.log("Title: ".concat(this.title, ", Author: ").concat(this.author, ", Year: ").concat(this.year));
    };
    return Book;
}());
// Khởi tạo đối tượng sách và kiểm thử
var myBook = new Book("Lập Trình Thiết Bị Di Động", "Nguyen Tran Xuan Dung", 2024);
myBook.displayBookInfo();
