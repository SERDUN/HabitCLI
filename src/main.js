import {getArguments, getCommand} from './utils/index.js';
import {HabitAnalyticsController, HabitManagerController} from './features/index.js';

const args = getArguments();
const command = getCommand();

const controllers = [new HabitManagerController(), new HabitAnalyticsController()];

const controller = controllers.find((c) => c.canHandle(command));

if (controller) {
    console.log('command', command);
    console.log('args', args);
    await controller.execute(command, args);
} else {
    console.error(`Command "${command}" is not recognized.`);
    process.exit(1);
}
