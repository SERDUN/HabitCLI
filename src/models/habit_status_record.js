import {HabitStatus} from './habit_status.js';

/**
 * Class representing the full status history for a specific habit
 */
export class HabitStatusRecord {
    /**
     * @param {Habit} habit - ID of the corresponding habit
     * @param {HabitStatus[]} statuses - Array of status entries
     */
    constructor(habit, statuses = []) {
        this.habit = habit;
        this.statuses = statuses.map(s => new HabitStatus(s.date, s.status));
    }

    /**
     * Returns a Set of unique dates (yyyy-mm-dd) when the habit was marked.
     * @returns {Set<string>}
     */
    get uniqueDays() {
        return new Set(this.statuses.map(s => new Date(s.date).toISOString().slice(0, 10)));
    }
}
