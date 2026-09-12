class MathUtil {
    public static add(a: number, b: number): number {
        return a + b;
    }

    public static minus(a: number, b: number): number {
        return a - b;
    }

    public static multiply(a: number, b: number): number {
        return a * b;
    }

    public static divide(a: number, b: number): number {
        return a / b;
    }
}

console.log(MathUtil.add(1, 2));
console.log(MathUtil.multiply(5, 8));