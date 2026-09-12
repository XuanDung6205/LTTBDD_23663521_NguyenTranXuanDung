class BankAccount {
    balance: number;

    constructor(bal: number) {
        this.balance = bal
    }

    public deposit(money: number): void {
        console.log(`${this.balance - money}`);
    }

    public withdraw(money: number): void {
        console.log(`${this.balance + money}`);
    }
}

const bankAccount = new BankAccount(1000);
bankAccount.deposit(200);
bankAccount.withdraw(1000);