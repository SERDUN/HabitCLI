import {BaseController, validateOrFail} from '../../utils/index.js';
import {HabitTrackingServices} from './habit_tracking.services.js';
import {CompletionStatsRow} from './dto/index.js';

/**
 * Controller for tracking habit completion.
 * Handles marking habits as done and generating completion statistics.
 */
export class HabitTrackingController extends BaseController {
    static #idSchema = {
        id: {required: true, type: 'string'}
    };

    constructor(service = new HabitTrackingServices()) {
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

        this.service.doneHabit(args.id);
    }

    /**
     * Shows completion statistics for a specific habit over the past 30 days.
     * @param {{id: string}} args - The ID of the habit to analyze.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     * @returns {object|undefined} - Table row DTO if data exists, otherwise undefined.
     */
    listHabitCompletionStats(args, {renderer}) {
        if (!validateOrFail(HabitTrackingController.#idSchema, args, (errors) => {
            renderer.error(errors.join('; '));
        })) return;


        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 29);

        const record = this.service.getStatusRecord(args.id);
        const percent = this.service.calculateCompletionPercentageById(args.id, thirtyDaysAgo.toISOString(), today.toISOString());

        if (!record || !record.statuses?.length) {
            renderer.warning?.(`No tracked statuses for habit ID: ${args.id}`);
            return;
        }
        renderer.section?.('Habit Completion Overview');
        const uniqueDays = new Set(record.statuses.map(s => new Date(s.date).toISOString().slice(0, 10)));
        return new CompletionStatsRow(record.habitId, uniqueDays.size, percent).toTableRow();
    }


    /**
     * Shows completion statistics for all habits over the past 30 days.
     * @param {*} args - Not used.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    listAllHabitsCompletionStats(args, {renderer}) {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 29);

        const records = this.service.getAllStatuses();

        if (!records || !records.length) {
            renderer.warning?.('No tracked statuses found for any habits.');
            return;
        }

        renderer.section?.('Overall Completion Overview');

        const tableData = records.map(record => {
            const uniqueDays = new Set(record.statuses.map(s => new Date(s.date).toISOString().slice(0, 10)));
            const percent = this.service.calculateCompletionPercentageById(record.habitId, thirtyDaysAgo.toISOString(), today.toISOString());
            return new CompletionStatsRow(record.habitId, uniqueDays.size, percent).toTableRow();
        });

        renderer.table?.(tableData);
    }
}
