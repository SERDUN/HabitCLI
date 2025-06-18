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
	 * @param {() => BaseController} controllerFactory - A function that returns a controller instance.
	 * @param {Function[]} [middlewares=[]] - Array of middleware functions to apply before controller execution.
	 */
	addController(controllerFactory, middlewares = []) {
		this.controllerDefs.push({
			controller: controllerFactory(), // викликаємо функцію для отримання інстансу
			middlewares,
		});
	}

	/**
	 * Applies middleware functions to args.
	 * @param {Function[]} stack
	 * @param {object} args
	 * @returns {Promise<object>}
	 */
	async #applyMiddleware(stack, args) {
		let result = args;
		for (const middleware of stack) {
			result = await middleware(result);
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
			controller.canHandle(command),
		);

		if (!match) {
			this.renderer.error?.(`Command "${command}" is not recognized.`);
			process.exit(1);
		}

		const finalArgs = await this.#applyMiddleware(match.middlewares, args);

		await match.controller.execute(command, finalArgs, {
			renderer: this.renderer,
		});
	}
}
