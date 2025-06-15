import {getArguments, getCommand} from './utils/index.js';
import {HabitManagerController} from './features/index.js';
import {CommandRouter} from './utils/index.js';

const args = getArguments();
const command = getCommand();

const router = new CommandRouter([new HabitManagerController()]);

await router.handle(command, args);
