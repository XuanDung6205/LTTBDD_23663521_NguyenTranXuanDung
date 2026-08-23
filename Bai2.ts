class Person {
    name: string;
    age: number;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    displayInfo(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
  }
  
  // Lớp Student kế thừa từ lớp Person
  class Student extends Person {
    grade: string; // Thuộc tính bổ sung
  
    constructor(name: string, age: number, grade: string) {
      super(name, age); // Gọi hàm khởi tạo của lớp cha (Person)
      this.grade = grade;
    }
  
    // Phương thức hiển thị đầy đủ thông tin
    displayStudentInfo(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
  }
  
  // Khởi tạo đối tượng và kiểm thử
  const student1 = new Student("Nguyen Tran Xuan Dung", 20, "A+");
  student1.displayStudentInfo();