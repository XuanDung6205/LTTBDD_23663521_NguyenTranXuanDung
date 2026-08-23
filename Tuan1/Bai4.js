var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    // Phương thức tính diện tích
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    // Phương thức tính chu vi
    Rectangle.prototype.getPerimeter = function () {
        return 2 * (this.width + this.height);
    };
    // Hiển thị đầy đủ thông tin
    Rectangle.prototype.displayInfo = function () {
        console.log("Width: ".concat(this.width, ", Height: ").concat(this.height));
        console.log("Area: ".concat(this.getArea()));
        console.log("Perimeter: ".concat(this.getPerimeter()));
    };
    return Rectangle;
}());
// Khởi tạo đối tượng hình chữ nhật (chiều rộng = 5, chiều cao = 10)
var myRectangle = new Rectangle(5, 10);
myRectangle.displayInfo();
