import {HabitStatus} from './habit_status.js';

/**
 * Class representing the full status history for a specific habit
 */
export class HabitStatusRecord {
    /**
     * @param {string} habitId - ID of the corresponding habit
     * @param {HabitStatus[]} statuses - Array of status entries
     */
    constructor(habitId, statuses = []) {
        this.habitId = habitId;
        this.statuses = statuses.map(s => new HabitStatus(s.date, s.status));
    }

    /**
     * Returns a new HabitStatusRecord with overridden fields
     * @param {Object} fields
     * @param {string} [fields.habitId]
     * @param {HabitStatus[]} [fields.statuses]
     * @returns {HabitStatusRecord}
     */
    copyWith({habitId, statuses} = {}) {
        return new HabitStatusRecord(
            habitId ?? this.habitId,
            statuses ?? this.statuses
        );
    }
}
