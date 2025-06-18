import {BaseRenderer} from './base.renderer.js';

export class CommandRouter {
    constructor(controllers = [], renderer = new BaseRenderer()) {
        /**
         * @type {{controller: BaseController, middlewares: Function[]}[]}
         */
        this.controllerDefs = controllers.map((c) => ({
            controller: c,
            middlewares: [],
        }));

        this.renderer = renderer;
    }

    /**
     * Adds a controller with optional middleware.
     * @param {Class<BaseController>} ControllerClass - Controller class (not instance).
     * @param {Function[]} [middlewares=[]] - Array of middleware functions.
     */
    addController(ControllerClass, middlewares = []) {
        this.controllerDefs.push({
            controller: new ControllerClass(),
            middlewares,
        });
    }

    /**
     * Applies middleware functions to args.
     * @param {Function[]} stack
     * @param {object} args
     * @param {string} command
     * @returns {Promise<object>}
     */
    async #applyMiddleware(stack, args, command) {
        let result = args;
        for (const middleware of stack) {
            result = await middleware(result, command);
        }
        return result;
    }

    /**
     * Handles a CLI command: finds controller and executes it after middleware.
     * @param {string} command
     * @param {object} args
     */
    async handle(command, args) {
        const match = this.controllerDefs.find(({controller}) =>
            controller.canHandle(command)
        );

        if (!match) {
            this.renderer.error?.(`Command "${command}" is not recognized.`);
            process.exit(1);
        }

        const finalArgs = await this.#applyMiddleware(match.middlewares, args, command);

        await match.controller.execute(command, finalArgs, {
            renderer: this.renderer,
        });
    }
}
