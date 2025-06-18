import {HabitRepository} from '../../repository/index.js';
import {TrackingRepository} from '../../repository/index.js';
import {TimeRangeUtils} from '../../utils/index.js';
import {HabitStatus} from '../../models/index.js';

/**
 * Service class responsible for managing habit tracking operations such as adding statuses and calculating completion rates.
 */
export class HabitTrackingServices {
	/**
	 * @param {HabitRepository} habitRepository - Repository for accessing habit data.
	 * @param {TrackingRepository} trackingRepository - Repository for accessing tracking status data.
	 * @param {TimeRangeUtils} timeRangeUtils - Utility for working with time ranges.
	 */
	constructor(habitRepository = new HabitRepository(), trackingRepository = new TrackingRepository(), timeRangeUtils = new TimeRangeUtils()) {
		this.habitRepository = habitRepository;
		this.trackingRepository = trackingRepository;
		this.timeRangeUtils = timeRangeUtils;
	}

	/**
	 * @typedef {'PENDING' | 'IN_PROGRESS' | 'DONE'} status
	 */

	/**
	 * Adds a new tracking status for a given habit.
	 * Throws an error if the habit is not found or if the habit has already been marked done for the current range.
	 *
	 * @param {string} id - The ID of the habit to track.
	 * @param {status} [status='DONE'] - The status to be recorded.
	 * @returns {HabitStatus} - The newly added status.
	 * @throws {Error} - If the habit does not exist or has already been marked done for the current range.
	 */
	addTrackingStatus(id, status = 'DONE') {
		const habit = this.habitRepository.getById(id);
		if (!habit) {
			throw new Error(`Habit with id ${id} not found`);
		}

		const record = this.trackingRepository.getStatusesByHabitId(habit.id);
		const latest = this.#getLatestStatus(record);

		if (!latest) {
			return this.trackingRepository.addStatus(habit.id, new HabitStatus(this.timeRangeUtils.getNow(), status));
		}

		this.#assertStatusNotAlreadyDone(habit, latest.date);
		return this.trackingRepository.addStatus(habit.id, new HabitStatus(this.timeRangeUtils.getNow(), status));
	}

	/**
	 * Calculates the percentage of completion of a habit within a specific date range.
	 *
	 * @param {string} habitId - The ID of the habit.
	 * @param {Date} from - Start date of the range.
	 * @param {Date} to - End date of the range.
	 * @returns {number} - Completion percentage (0-100).
	 * @throws {Error} - If no tracking record is found for the habit.
	 */
	calculateCompletionPercentageById(habitId, from, to) {
		const record = this.trackingRepository.getStatusesByHabitId(habitId);
		if (!record) {
			throw new Error(`No tracking record found for habit with id ${habitId}`);
		}
		const statuses = record.statuses.filter(status => {
			const statusDate = new Date(status.date);
			return statusDate >= from && statusDate <= to;
		});

		if (statuses.length === 0) {
			return 0;
		}
		const totalDays = this.timeRangeUtils.getTotalDaysInRange(from, to);
		const completedDays = statuses.length;
		return Math.round((completedDays / totalDays) * 100);
	}

	/**
	 * Retrieves the tracking record for a specific habit.
	 *
	 * @param {string} habitId - The ID of the habit.
	 * @returns {Object|null} - The tracking record or null if not found.
	 */
	getStatusRecord(habitId) {
		return this.trackingRepository.getStatusesByHabitId(habitId);
	}

	/**
	 * Retrieves all tracking records for all habits.
	 *
	 * @returns {Array<Object>} - List of all tracking records.
	 */
	getAllStatuses() {
		return this.trackingRepository.getAllStatuses();
	}

	/**
	 * Returns the most recent status from a habit's tracking record.
	 *
	 * @private
	 * @param {Object} record - The tracking record.
	 * @returns {Object|null} - The latest status or null if none exist.
	 */
	#getLatestStatus(record) {
		if (!record || !record.statuses?.length) return null;
		return [...record.statuses].sort((a, b) => new Date(a.date) - new Date(b.date)).at(-1);
	}

	/**
	 * Throws an error if the habit is already marked done within the current frequency range.
	 *
	 * @private
	 * @param {Object} habit - The habit object.
	 * @param {string|Date} lastStatusDate - The date of the last status.
	 * @throws {Error} - If the habit has already been completed in the current range.
	 */
	#assertStatusNotAlreadyDone(habit, lastStatusDate) {
		if (this.timeRangeUtils.isInCurrentRange(habit.freq, lastStatusDate)) {
			throw new Error(`Habit with id ${habit.id} is already done for today`);
		}
	}
}
