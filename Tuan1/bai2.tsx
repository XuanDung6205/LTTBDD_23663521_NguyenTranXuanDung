import { Person } from "./bai1"

class Student extends Person {
    grade: string;

    public constructor(name: string, age: number, grade: string) {
        super(name, age); // của class cha (person)
        this.grade = grade;
    }

    public showInfo(): void {
        console.log(`đây là Bài 2: name: ${this.name}, age: ${this.age}, grade: ${this.grade}`);
    }
}

const student = new Student("Dũng", 21, "A+");
student.showInfo();