class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    public bark(): void {
        console.log("GAU GAU GAU");
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    public meow(): void {
        console.log("meo meo meo");
    }
}


const cat = new Cat("Mèo");
const dog = new Dog("chó");

dog.bark();
cat.meow();