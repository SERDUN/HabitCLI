/**
 * Utility class for working with time-based ranges and comparisons.
 */
export class TimeRangeUtils {
	static MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

	/**
	 * @param {number} dayOffset - Optional number of days to shift "today". Positive shifts into the future, negative into the past.
	 */
	constructor(dayOffset = 0) {
		this.dayOffset = dayOffset;
	}

	/**
	 * Returns a shifted version of the current date.
	 * @returns {Date}
	 */
	getNow() {
		const now = new Date();
		now.setDate(now.getDate() + this.dayOffset);
		return now;
	}

	/**
	 * Checks if the given ISO date string is today.
	 * @param {string} isoString
	 * @returns {boolean}
	 */
	isToday(isoString) {
		const inputDate = new Date(isoString);
		const now = this.getNow();

		return (
			inputDate.getFullYear() === now.getFullYear() &&
			inputDate.getMonth() === now.getMonth() &&
			inputDate.getDate() === now.getDate()
		);
	}

	/**
	 * Checks if the given ISO date string falls within the current week (Sunday–Saturday).
	 * @param {string} isoString
	 * @returns {boolean}
	 */
	isThisWeek(isoString) {
		const inputDate = new Date(isoString);
		const now = this.getNow();

		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

		return (
			inputDate >= this.startOfDay(startOfWeek) &&
			inputDate <= this.endOfDay(endOfWeek)
		);
	}

	/**
	 * Checks if the given ISO date string is in the current month.
	 * @param {string} isoString
	 * @returns {boolean}
	 */
	isThisMonth(isoString) {
		const inputDate = new Date(isoString);
		const now = this.getNow();

		return (
			inputDate.getFullYear() === now.getFullYear() &&
			inputDate.getMonth() === now.getMonth()
		);
	}

	/**
	 * Determines whether a date falls in the current range based on frequency.
	 * @param {'day' | 'week' | 'monthly'} freq
	 * @param {string} isoString
	 * @returns {boolean}
	 */
	isInCurrentRange(freq, isoString) {
		switch (freq) {
			case 'day':
				return this.isToday(isoString);
			case 'week':
				return this.isThisWeek(isoString);
			case 'monthly':
				return this.isThisMonth(isoString);
			default:
				throw new Error(`Unsupported frequency: ${freq}`);
		}
	}

	/**
	 * Calculates the total number of days in a date range, inclusive of both start and end dates.
	 * Assumes both parameters are valid Date objects.
	 * @param {Date} startDate
	 * @param {Date} endDate
	 * @returns {number}
	 */
	getTotalDaysInRange(startDate, endDate) {
		const startOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
		const endOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

		const msPerDay = 1000 * 60 * 60 * 24;
		const diff = Math.round((endOnly - startOnly) / msPerDay);

		return diff + 1;
	}

	/**
	 * Returns the beginning of a day (00:00:00.000).
	 * @param {Date} date
	 * @returns {Date}
	 */
	startOfDay(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
	}

	/**
	 * Returns the end of a day (23:59:59.999).
	 * @param {Date} date
	 * @returns {Date}
	 */
	endOfDay(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
	}
}
