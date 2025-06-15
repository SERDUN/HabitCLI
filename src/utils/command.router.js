export class CommandRouter {
    constructor(controllers) {
        this.controllers = controllers;
    }

    async handle(command, args) {
        const controller = this.controllers.find((c) => c.canHandle(command));

        if (!controller) {
            console.error(`Command "${command}" is not recognized.`);
            process.exit(1);
        }

        console.log('Command:', command);
        console.log('Args:', args);

        await controller.execute(command, args);
    }
}
