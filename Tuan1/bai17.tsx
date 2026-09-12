class Logger {
    private static instance: Logger;
    private constructor() { }

    static getInfo(): Logger {
        if (!Logger.instance) {
            this.instance = new Logger();
        }

        return this.instance;
    }

    showInfor(mess: string): void {
        console.log(mess);
    }
}

const log = Logger.getInfo();
log.showInfor("hello world");