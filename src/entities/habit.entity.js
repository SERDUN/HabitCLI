/**
 * Represents the persistence model for Habit (used for JSON storage).
 */
export class HabitEntity {
	/**
	 * @param {string} id - Unique identifier
	 * @param {string} title - Name of the habit
	 * @param {'daily' | 'weekly' | 'monthly'} freq - Frequency of the habit
	 * @param {string} updatedAt - ISO date string
	 */
	constructor(id, title, freq, updatedAt) {
		this.id = id;
		this.title = title;
		this.freq = freq;
		this.updatedAt = updatedAt;
	}
}
