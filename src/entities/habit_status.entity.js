/**
 * Entity class representing a single status entry for persistence (e.g., JSON).
 */
export class HabitStatusEntity {
	/**
	 * @param {string} date - ISO-formatted date string
	 * @param {StatusType} status - The status value
	 */
	constructor(date, status) {
		this.date = date;
		this.status = status;
	}
}
