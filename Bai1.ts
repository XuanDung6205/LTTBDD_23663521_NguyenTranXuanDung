class Person {
    // 1. Khai báo các thuộc tính (Attributes / Properties)
    name: string;
    age: number;
  
    // 2. Hàm khởi tạo (Constructor)
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    // 3. Phương thức hiển thị thông tin (Method)
    displayInfo(): void {
      console.log(`Name: ${this.name}, Age:${this.age}`);
    }
  }
  
  // 4. Khởi tạo đối tượng (Object Instantiation) và kiểm thử
  const person1 = new Person("Nguyen Tran Xuan Dung", 20);
  person1.displayInfo();