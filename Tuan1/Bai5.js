var BankAccount = /** @class */ (function () {
    function BankAccount(initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        this.balance = initialBalance;
    }
    // Phương thức nạp tiền
    BankAccount.prototype.deposit = function (amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log("N\u1EA1p th\u00E0nh c\u00F4ng ".concat(amount, "$. S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: ").concat(this.balance, "$"));
        }
        else {
            console.log("Số tiền nạp phải lớn hơn 0.");
        }
    };
    // Phương thức rút tiền
    BankAccount.prototype.withdraw = function (amount) {
        if (amount <= 0) {
            console.log("Số tiền rút phải lớn hơn 0.");
        }
        else if (amount > this.balance) {
            console.log("R\u00FAt th\u1EA5t b\u1EA1i: S\u1ED1 d\u01B0 kh\u00F4ng \u0111\u1EE7! (S\u1ED1 d\u01B0: ".concat(this.balance, "$)"));
        }
        else {
            this.balance -= amount;
            console.log("R\u00FAt th\u00E0nh c\u00F4ng ".concat(amount, "$. S\u1ED1 d\u01B0 c\u00F2n l\u1EA1i: ").concat(this.balance, "$"));
        }
    };
    return BankAccount;
}());
// Khởi tạo tài khoản với số dư ban đầu 1000$ và kiểm thử
var myAccount = new BankAccount(1000);
myAccount.deposit(500); // Nạp 500$
myAccount.withdraw(300); // Rút 300$
myAccount.withdraw(1500); // Thử rút vượt quá số dư
