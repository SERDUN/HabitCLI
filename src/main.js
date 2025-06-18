import {getArguments, getCommand} from './utils/index.js';
import {HabitManagerController, HabitTrackingController} from './features/index.js';
import {CommandRouter} from './utils/index.js';

const args = getArguments();
const command = getCommand();

const router = new CommandRouter();

router.addController(HabitManagerController);
router.addController(HabitTrackingController);

await router.handle(command, args);
