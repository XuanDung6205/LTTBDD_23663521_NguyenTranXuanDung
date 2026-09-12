abstract class Shape {
    abstract area(): void
}

class Square extends Shape {
    width: number;
    height: number;

    constructor(wi: number, he: number) {
        super()
        this.width = wi;
        this.height = he;
    }



    public area(): void {
        console.log("diện tích hình vuông: " + this.height * this.width);
    }
}

class Circle extends Shape {
    rad: number;

    constructor(rad: number) {
        super()
        this.rad = rad;

    }

    public area(): void {
        console.log("diện tích hình tròn: " + 3.14 * this.rad * this.rad);
    }
}

const square = new Square(10, 20);
const circle = new Circle(15);

square.area();
circle.area();