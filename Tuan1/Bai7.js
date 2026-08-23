var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setName = function (name) {
        return this.name = name;
    };
    User.prototype.showInfor = function () {
        console.log("name: ".concat(this.name));
    };
    return User;
}());
var user = new User("Dũng");
user.showInfor();
user.setName("Dũng đẹp trai");
user.showInfor();
