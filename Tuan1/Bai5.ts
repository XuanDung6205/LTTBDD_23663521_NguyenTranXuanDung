class BankAccount {
    balance: number;
  
    constructor(initialBalance: number = 0) {
      this.balance = initialBalance;
    }
  
    // Phương thức nạp tiền
    deposit(amount: number): void {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Nạp thành công ${amount}$. Số dư hiện tại: ${this.balance}$`);
      } else {
        console.log("Số tiền nạp phải lớn hơn 0.");
      }
    }
  
    // Phương thức rút tiền
    withdraw(amount: number): void {
      if (amount <= 0) {
        console.log("Số tiền rút phải lớn hơn 0.");
      } else if (amount > this.balance) {
        console.log(`Rút thất bại: Số dư không đủ! (Số dư: ${this.balance}$)`);
      } else {
        this.balance -= amount;
        console.log(`Rút thành công ${amount}$. Số dư còn lại: ${this.balance}$`);
      }
    }
  }
  
  // Khởi tạo tài khoản với số dư ban đầu 1000$ và kiểm thử
  const myAccount = new BankAccount(1000);
  myAccount.deposit(500);   // Nạp 500$
  myAccount.withdraw(300);  // Rút 300$
  myAccount.withdraw(1500); // Thử rút vượt quá số dư