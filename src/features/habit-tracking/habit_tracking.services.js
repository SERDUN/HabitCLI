import {HabitRepository} from '../../repository/index.js';
import {TrackingRepository} from '../../repository/tracking.repository.js';
import {TimeRange} from '../../utils/index.js';

export class HabitTrackingServices {
    constructor(habitRepository = new HabitRepository(), trackingRepository = new TrackingRepository()) {
        this.habitRepository = habitRepository;
        this.trackingRepository = trackingRepository;
    }

    doneHabit(id) {
        const habit = this.habitRepository.getById(id);
        if (!habit) {
            throw new Error(`Habit with id ${id} not found`);
        }

        // Check if the habit is already done by habit frequency
        const record = this.trackingRepository.getStatusesByHabitId(habit.id);
        if (!record || !record.statuses || record.statuses.length === 0) {
            return this.trackingRepository.addStatus(habit.id);
        }

        const sortedStatuses = [...record.statuses].sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
        const lastStatus = sortedStatuses[sortedStatuses.length - 1];
        const lastDate = lastStatus.date;

        const isInCurrentRange = TimeRange.isInCurrentRange(habit.freq, lastDate);

        if (!isInCurrentRange) {
            return this.trackingRepository.addStatus(habit.id);
        }
    }

    calculateCompletionPercentageById(habitId, startDate, endDate) {
        const record = this.trackingRepository.getStatusesByHabitId(habitId);
        if (!record) {
            throw new Error(`No tracking record found for habit with id ${habitId}`);
        }
        const statuses = record.statuses.filter(status => {
            const statusDate = new Date(status.date);
            return statusDate >= new Date(startDate) && statusDate <= new Date(endDate);
        });
        if (statuses.length === 0) {
            return 0;
        }
        const totalDays = TimeRange.getTotalDaysInRange(startDate, endDate);
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
