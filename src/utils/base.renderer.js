export class BaseRenderer {
    log(...args) {
        console.log(...args);
    }

    error(...args) {
        console.error(...args);
    }

    debug(...args) {
        console.debug(...args);
    }

    table(rows) {
        console.table(rows);
    }
}
