export class Person {
    name: string;
    age: number;

    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public showInfo(): void {
        console.log(`name: ${this.name}, age: ${this.age}`);
    }
}

// khởi tạo đối tượng
const person = new Person("Dũng", 21);
person.showInfo();