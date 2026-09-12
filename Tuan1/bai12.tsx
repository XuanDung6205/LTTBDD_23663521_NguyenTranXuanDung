interface Flyable {
    fly(): void
}

interface Swimmable {
    swim(): void
}

class Bird implements Flyable {
    public fly(): void {
        console.log("bay vèo vèo")
    }
}

class Fish implements Swimmable {
    public swim(): void {
        console.log("cá đang bơi")
    }
}

const bird = new Bird();
const fish = new Fish();

bird.fly();
fish.swim();