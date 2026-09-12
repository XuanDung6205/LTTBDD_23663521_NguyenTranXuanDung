class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Manager extends Employee {
    constructor(name: string) {
        super(name);
    }

    public manage(): void {
        console.log(this.name + " đang thực hiện quản lý");
    }
}

class Developer extends Employee {
    constructor(name: string) {
        super(name);
    }

    public code(): void {
        console.log(this.name + " đang coding");
    }
}

const manager = new Manager("Dũng");
const dev = new Developer("nô lệ typescript");

manager.manage();
dev.code();