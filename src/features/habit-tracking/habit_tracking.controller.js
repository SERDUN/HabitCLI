import {BaseController, validateOrFail} from '../../utils/index.js';
import {HabitTrackingServices} from './habit_tracking.services.js';
import {CompletionStatsRow} from './dto/index.js';
import {HabitRepository} from '../../repository/index.js';
import {TrackingRepository} from '../../repository/tracking.repository.js';

/**
 * Controller for tracking habit completion.
 * Handles marking habits as done and generating completion statistics.
 */
export class HabitTrackingController extends BaseController {
	static #idSchema = {
		id: {required: true, type: 'string'},
	};

	constructor(timeRange, service = new HabitTrackingServices(new HabitRepository(), new TrackingRepository(), timeRange)) {
		super();
		this.service = service;
		this.#registerCommands();
	}

	/**
	 * Registers CLI commands with their corresponding handler methods.
	 * @private
	 */
	#registerCommands() {
		this.register('done', this.doneHabit.bind(this));
		this.register('stats', this.listHabitCompletionStats.bind(this));
		this.register('stats:all', this.listAllHabitsCompletionStats.bind(this));
	}

	/**
	 * Marks a habit as completed for today.
	 * @param {{id: string}} args - The ID of the habit to mark as done.
	 * @param {{renderer: any}} context - Rendering context (not used here).
	 */
	doneHabit(args, {renderer}) {
		if (!validateOrFail(HabitTrackingController.#idSchema, args, (errors) => {
			renderer.error(errors.join('; '));
		})) return;

		this.service.addTrackingStatus(args.id);
	}

	/**
	 * Shows completion statistics for a specific habit in a given date range.
	 * Includes number of unique completion days and the percentage.
	 *
	 * @param {{id: string, from: Date, to: Date}} args - Habit ID and date range to analyze.
	 * @param {{renderer: any}} context - Rendering context for CLI output.
	 * @returns {object|undefined} - Table row DTO if data exists, otherwise undefined.
	 */
	listHabitCompletionStats(args, {renderer}) {
		if (!validateOrFail(HabitTrackingController.#idSchema, args, (errors) => {
			renderer.error(errors.join('; '));
		})) return;

		const record = this.service.getStatusRecord(args.id);

		if (!record || !record.statuses?.length) {
			renderer.warning?.(`No tracked statuses for habit ID: ${args.id}`);
			return;
		}

		const percent = this.service.calculateCompletionPercentageById(args.id, args.from, args.to);

		renderer.section?.(`Overall Completion Overview (${args.from.toISOString()} → ${args.to.toISOString()})`);
		renderer.table?.([new CompletionStatsRow(record.habit.id, record.habit.title, record.uniqueDays.size, percent).toTableRow()]);

	}

	/**
	 * Shows completion statistics for all habits in a given date range.
	 * Each row includes the number of unique completion days and the percentage of completion.
	 *
	 * @param {{from: Date, to: Date}} args - Date range for completion analysis.
	 * @param {{renderer: any}} context - Rendering context for CLI output.
	 */
	listAllHabitsCompletionStats(args, {renderer}) {
		const records = this.service.getAllStatuses();

		if (!records?.length) {
			renderer.warning?.('No tracked statuses found for any habits.');
			return;
		}

		const tableData = records.map(record => {
			const percent = this.service.calculateCompletionPercentageById(record.habit.id, args.from, args.to);
			return new CompletionStatsRow(record.habit.id, record.habit.title, record.uniqueDays.size, percent).toTableRow();
		});

		renderer.section?.(`Overall Completion Overview (${args.from.toISOString()} → ${args.to.toISOString()})`);
		renderer.table?.(tableData);
	}
}
