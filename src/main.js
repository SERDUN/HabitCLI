import {getArguments, getCommand} from './utils/index.js';
import {HabitAnalyticsController, HabitManagerController} from './features/index.js';
import {CommandRouter} from './utils/index.js';

const args = getArguments();
const command = getCommand();

const router = new CommandRouter([
    new HabitManagerController(),
    new HabitAnalyticsController(),
]);

await router.handle(command, args);
