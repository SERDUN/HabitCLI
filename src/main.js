import {getArguments, getCommand} from './utils/index.js';
import {HabitManagerController, HabitTrackingController} from './features/index.js';
import {CommandRouter} from './utils/index.js';

const args = getArguments();
const command = getCommand();

const router = new CommandRouter([new HabitManagerController(), new HabitTrackingController(),]);

await router.handle(command, args);
