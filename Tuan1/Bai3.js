var Car = /** @class */ (function () {
    function Car(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    Car.prototype.displayCarInfo = function () {
        console.log("Brand: ".concat(this.brand, ", Model: ").concat(this.model, ", Year: ").concat(this.year));
    };
    return Car;
}());
// Khởi tạo đối tượng và kiểm thử
var myCar = new Car("Toyota", "Camry", 2024);
myCar.displayCarInfo();
