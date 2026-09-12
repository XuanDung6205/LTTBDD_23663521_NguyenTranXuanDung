class Account {
    public username: string;
    private password: string;
    readonly accountId: string; // gán 1 lần qua constructor, ko thể sửa

    constructor(name: string, pass: string, id: string) {
        this.username = name;
        this.password = pass;
        this.accountId = id;
    }

    public showInfo() {
        console.log(`${this.username}, ${this.password}, ${this.accountId}`);
    }
}

const account = new Account("Dũng", "123", "ID001");
// account.accountId = "100"; báo lỗi
account.showInfo();