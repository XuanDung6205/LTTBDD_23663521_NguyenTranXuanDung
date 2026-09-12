interface Vehicle {
    speed(): void;
    weight(): void;
}

class Car implements Vehicle {
    public speed(): void {
        console.log("100kh/h");
    }

    public weight(): void {
        console.log("500 tấn");
    }
}

class Bike implements Vehicle {
    public speed(): void {
        console.log("10/h");
    }

    public weight(): void {
        console.log("10 tấn");
    }
}

const car = new Car();
const bike = new Bike();

car.speed();
car.weight();

bike.speed();
bike.weight();