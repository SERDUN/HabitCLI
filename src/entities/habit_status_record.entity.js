import {HabitStatusEntity} from './habit_status.entity.js';

/**
 * Represents a persistence model of habit tracking — used for storing in JSON.
 */
export class HabitStatusRecordEntity {
	/**
	 * @param {string} habitId - ID of the corresponding habit
	 * @param {HabitStatusEntity[]} statuses - Array of status entries
	 */
	constructor(habitId, statuses = []) {
		this.habitId = habitId;
		this.statuses = statuses.map(s => new HabitStatusEntity(s.date, s.status));
	}

	/**
	 * Creates a new HabitStatusRecordEntity with the new status appended.
	 * @param {HabitStatusEntity} newStatus
	 * @returns {HabitStatusRecordEntity}
	 */
	cloneWith(newStatus) {
		return new HabitStatusRecordEntity(
			this.habitId,
			[...this.statuses, newStatus],
		);
	}

	/**
	 * Create from plain object (e.g., parsed from JSON)
	 * @param {{habitId: string, statuses: {date: string, status: string}[]}} data
	 * @returns {HabitStatusRecordEntity}
	 */
	static fromJSON(data) {
		if (!data || !Array.isArray(data.statuses)) {
			return null;
		}

		const statuses = data.statuses.map(s => new HabitStatusEntity(s.date, s.status));
		return new HabitStatusRecordEntity(data.habitId, statuses);
	}
}
