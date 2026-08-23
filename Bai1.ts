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
  
  // Test the class
  const person1 = new Person("Nguyen Tran Xuan Dung", 20);
  person1.displayInfo();