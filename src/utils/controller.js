export class BaseController {
    constructor() {
        this.routes = {};
    }

    register(action, methodName) {
        this.routes[action] = methodName;
    }

    execute(action, ...args) {
        const methodName = this.routes[action];

        if (typeof this[methodName] === 'function') {
            return this[methodName](...args);
        }
    }

    canHandle(action) {
        const methodName = this.routes[action];
        return typeof this[methodName] === 'function';
    }
}
