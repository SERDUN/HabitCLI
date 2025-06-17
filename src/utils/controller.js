export class BaseController {
    constructor() {
        this.routes = {};
    }

    register(action, handlerFn) {
        this.routes[action] = handlerFn;
    }

    execute(action, ...args) {
        const handler = this.routes[action];
        if (typeof handler === 'function') {
            return handler(...args);
        }
    }

    canHandle(action) {
        return typeof this.routes[action] === 'function';
    }
}
