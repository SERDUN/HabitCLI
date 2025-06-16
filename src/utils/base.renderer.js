const COLORS = {
    reset: '\x1b[0m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
};

export class BaseRenderer {
    table(rows) {
        console.table(rows);
    }

    section(title, color = COLORS.cyan) {
        console.log(this.#formatSection(title, color));
    }

    success(message, color = COLORS.green) {
        console.log(this.#formatMessage(message, color));
    }

    details(message, color = COLORS.blue) {
        console.log(this.#formatMessage(message, color));
    }

    #formatSection(title, color) {
        return `\n${color}=== ${title} ===${COLORS.reset}`;
    }

    #formatMessage(message, color) {
        return `${color}${message}${COLORS.reset}`;
    }
}
