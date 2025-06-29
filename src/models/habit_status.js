/**
 * @typedef {'PENDING' | 'IN_PROGRESS' | 'DONE'} StatusType
 */

/**
 * Class representing a single status record of a habit
 */
export class HabitStatus {
	/**
	 * @param {string | Date} date - The date when the status was recorded
	 * @param {StatusType} status - The status of the habit on the given date
	 */
	constructor(date, status) {
		this.date = date;
		this.status = status;
	}

}
