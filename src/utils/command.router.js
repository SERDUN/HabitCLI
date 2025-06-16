import {BaseRenderer} from './base.renderer.js';

export class CommandRouter {
    constructor(controllers, renderer = new BaseRenderer()) {
        this.controllers = controllers;
        this.renderer = renderer;
    }

    async handle(command, args) {
        const controller = this.controllers.find((c) => c.canHandle(command));

        if (!controller) {
            this.renderer.error?.(`Command "${command}" is not recognized.`);
            process.exit(1);
        }

        await controller.execute(command, args, {renderer: this.renderer});
    }
}
