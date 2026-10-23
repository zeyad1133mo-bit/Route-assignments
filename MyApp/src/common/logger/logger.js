export class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance
    }
    log(level, message, metaData = {}) {
        let messageObl = {
            level: level,
            message: message,
            timestamp: new Date().toISOString(),
            ...metaData,
        }
        console.log(JSON.stringify(messageObl))
    }
    error(message, metaData = {}) {
        this.log('error', message, metaData);
    }
    debug(message, metaData = {}) {
        this.log('debug', message, metaData);
    }
    info(message, metaData = {}) {
        this.log('info', message, metaData);
    }
}

export const logger = new Logger();