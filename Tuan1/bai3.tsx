class Car {
    brand: string;
    model: string;
    year: number;

    public constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    public showInfo(): void {
        console.log(`${this.brand}, ${this.model}, ${this.year}`)
    }

}

const car = new Car("toyota", "5A-111", 2022);
car.showInfo();