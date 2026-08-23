class Rectangle {
    width: number;
    height: number;
  
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
  
    // Phương thức tính diện tích
    getArea(): number { 
      return this.width * this.height;
    }
  
    // Phương thức tính chu vi
    getPerimeter(): number {
      return 2 * (this.width + this.height);
    }
  
    // Hiển thị đầy đủ thông tin
    displayInfo(): void {
      console.log(`Width: ${this.width}, Height: ${this.height}`);
      console.log(`Area: ${this.getArea()}`);
      console.log(`Perimeter: ${this.getPerimeter()}`);
    }
  }
  
  // Khởi tạo đối tượng hình chữ nhật (chiều rộng = 5, chiều cao = 10)
  const myRectangle = new Rectangle(5, 10);
  myRectangle.displayInfo();