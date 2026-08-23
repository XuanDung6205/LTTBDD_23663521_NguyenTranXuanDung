class User{
    private name : string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string{
        return this.name
    }

    public setName(name: string) : string {
        return this.name = name;
    }

    public showInfor() : void{
        console.log(`name: ${this.name}`);
    }
    
}

const user = new User("Dũng");
user.showInfor();
user.setName("Dũng đẹp trai")
user.showInfor();