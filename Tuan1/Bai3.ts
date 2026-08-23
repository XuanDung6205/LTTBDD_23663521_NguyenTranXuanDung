class Car {
    brand: string;
    model: string;
    year: number;
  
    constructor(brand: string, model: string, year: number) {
      this.brand = brand;
      this.model = model;
      this.year = year;
    }
  
    displayCarInfo(): void {
      console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
    }
  }
  
  // Khởi tạo đối tượng và kiểm thử
  const myCar = new Car("Toyota", "Camry", 2024);
  myCar.displayCarInfo();