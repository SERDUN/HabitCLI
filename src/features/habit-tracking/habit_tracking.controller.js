import {BaseController} from '../../utils/index.js';
import {HabitTrackingServices} from './habit_tracking.services.js';

export class HabitTrackingController extends BaseController {
    constructor(service = new HabitTrackingServices()) {
        super();
        this.service = service;

        this.register('done', this.doneHabit.bind(this));
        this.register('calculateCompletionPercentageById', this.calculateCompletionPercentageById.bind(this));
        this.register('calculateCompletionPercentage', this.calculateCompletionPercentage.bind(this));
    }

    doneHabit(args) {
        this.service.doneHabit(args.id);
    }

    calculateCompletionPercentageById(args, {renderer}) {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 29);

        const record = this.service.getStatusRecord(args.id);
        const percent = this.service.calculateCompletionPercentageById(args.id, thirtyDaysAgo.toISOString(), today.toISOString());

        if (!record || !record.statuses?.length) {
            renderer.warning?.(`⚠ No tracked statuses for habit ID: ${args.id}`);
            return;
        }

        const uniqueDates = new Set(record.statuses.map(s => new Date(s.date).toISOString().slice(0, 10)) // тільки yyyy-mm-dd
        );

        renderer.section?.('Habit Completion Overview');
        renderer.details?.(`Habit ID: ${record.habitId}`);
        renderer.details?.(`Completed days: ${uniqueDates.size} / 30`);
        renderer.details?.(`Completion rate: ${percent.toFixed(2)}%`);

    }

    calculateCompletionPercentage(args, {renderer}) {
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
            const uniqueDates = new Set(record.statuses.map(s => new Date(s.date).toISOString().slice(0, 10)));
            const percent = this.service.calculateCompletionPercentageById(record.habitId, thirtyDaysAgo.toISOString(), today.toISOString());

            return {
                HabitID: record.habitId, 'Completed Days (30d)': uniqueDates.size, 'Completion %': percent.toFixed(2),
            };
        });

        renderer.table?.(tableData);
    }
}
