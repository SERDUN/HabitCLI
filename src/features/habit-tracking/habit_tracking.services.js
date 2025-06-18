import {HabitRepository} from '../../repository/index.js';
import {TrackingRepository} from '../../repository/index.js';
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

	#getLatestStatus(record) {
		if (!record || !record.statuses?.length) return null;
		return [...record.statuses].sort((a, b) => new Date(a.date) - new Date(b.date)).at(-1);
	}

	#assertStatusNotAlreadyDone(habit, lastStatusDate) {
		if (this.timeRangeUtils.isInCurrentRange(habit.freq, lastStatusDate)) {
			throw new Error(`Habit with id ${habit.id} is already done for today`);
		}
	}
}
