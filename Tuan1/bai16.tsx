class Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    public showValue(): T {
        return this.value;
    }
}

const num = new Box<number>(100);
const str = new Box<string>("ABX");

console.log(num.showValue());
console.log(str.showValue());
