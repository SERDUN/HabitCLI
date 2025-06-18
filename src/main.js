import {getArguments, getCommand, TimeRangeUtils} from './utils/index.js';
import {defaultDateRange, HabitManagerController, HabitTrackingController} from './features/index.js';
import {CommandRouter} from './utils/index.js';
import {EnvConfig} from './utils/index.js';

// Initialize environment configuration
EnvConfig.initialize();

const args = getArguments();
const command = getCommand();

const router = new CommandRouter();

router.addController(() => new HabitManagerController());
router.addController(
	() => new HabitTrackingController(new TimeRangeUtils(EnvConfig.dayOffset)),
	[
		(args) => defaultDateRange(args, EnvConfig.dayOffset, EnvConfig.rangeDays, EnvConfig.toDate),
	],
);
await router.handle(command, args);
