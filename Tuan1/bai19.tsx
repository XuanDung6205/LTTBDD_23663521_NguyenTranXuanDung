class Animal {
    sound(): void {
        console.log("tiếng kêu của con gì đó");
    }
}

class Dog extends Animal {
    override sound(): void {
        console.log("sủa ứ ừ");
    }
}

class Cat extends Animal {
    override sound(): void {
        console.log("kêu hahaha");
    }
}

// đa hình
const dog: Animal = new Dog();
const cat: Animal = new Cat();

dog.sound();
cat.sound();