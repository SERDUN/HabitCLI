import {HabitRepository} from '../../repository/index.js';
import {TrackingRepository} from '../../repository/tracking.repository.js';
import {TimeRangeUtils} from '../../utils/index.js';
import {HabitStatus} from '../../models/index.js';

export class HabitTrackingServices {
	constructor(habitRepository = new HabitRepository(), trackingRepository = new TrackingRepository(), timeRangeUtils = new TimeRangeUtils()) {
		this.habitRepository = habitRepository;
		this.trackingRepository = trackingRepository;
		this.timeRangeUtils = timeRangeUtils;
	}

	/**
	 * @typedef {'PENDING' | 'IN_PROGRESS' | 'DONE'} status
	 */
	addTrackingStatus(id, status= 'DONE') {
		const habit = this.habitRepository.getById(id);
		if (!habit) {
			throw new Error(`Habit with id ${id} not found`);
		}

		// Check if the habit is already done by habit frequency
		const record = this.trackingRepository.getStatusesByHabitId(habit.id);
		if (!record || !record.statuses || record.statuses.length === 0) {
			return this.trackingRepository.addStatus(habit.id, new HabitStatus(this.timeRangeUtils.getNow(), status));
		}

		const sortedStatuses = [...record.statuses].sort((a, b) => new Date(a.date) - new Date(b.date));
		const lastStatus = sortedStatuses[sortedStatuses.length - 1];
		const lastDate = lastStatus.date;

		const isInCurrentRange = this.timeRangeUtils.isInCurrentRange(habit.freq, lastDate);
		console.log(isInCurrentRange, lastDate, lastStatus);
		if (!isInCurrentRange) {
			return this.trackingRepository.addStatus(habit.id, new HabitStatus(this.timeRangeUtils.getNow(), status));
		} else {
			throw new Error(`Habit with id ${id} is already done for today`);
		}
	}

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

	getStatusRecord(habitId) {
		return this.trackingRepository.getStatusesByHabitId(habitId);
	}

	getAllStatuses() {
		return this.trackingRepository.getAllStatuses();
	}
}
