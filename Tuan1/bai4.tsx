class Rectangle {
    width: number;
    height: number;

    constructor(wi: number, he: number) {
        this.width = wi;
        this.height = he;
    }

    public area() {
        console.log(`ans: ${this.width + this.height}`);
    }
}

const retangle = new Rectangle(10, 20);
retangle.area();