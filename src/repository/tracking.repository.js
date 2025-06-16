import {JsonListDataSource} from '../datasources/index.js';
import {HabitStatusRecord} from '../models/habit_status_record.js';
import {HabitStatus} from '../models/index.js';


export class TrackingRepository {
    constructor(dataSource = new JsonListDataSource('tracking.json')) {
        this.dataSource = dataSource;
    }

    getStatusesByHabitId(habitId) {
        const existing = this.dataSource.getByProperty('habitId', habitId);
        if (!existing) {
            return null;
        }
        return new HabitStatusRecord(existing.habitId, existing.statuses);
    }

    addStatus(habitId) {
        const existing = this.dataSource.getByProperty('habitId', habitId);

        const newStatus = HabitStatus.create('DONE');

        if (!existing) {
            this.dataSource.add(new HabitStatusRecord(habitId, [newStatus]));
            return;
        }

        const updated = new HabitStatusRecord(habitId, [...existing.statuses, newStatus]);

        this.dataSource.update(existing, updated);
    }

    updateStatus(habitId, date, newStatus) {
        const existing = this.dataSource.getByProperty('habitId', habitId);
        if (!existing) {
            throw new Error(`Habit with id ${habitId} not found`);
        }

        const updatedStatuses = existing.statuses.map((status) => {
            if (status.date === date) {
                return HabitStatus.create(newStatus, date);
            }
            return status;
        });

        const updatedRecord = new HabitStatusRecord(existing.habitId, updatedStatuses);
        this.dataSource.update(existing, updatedRecord);
    }

    getAllStatuses() {
        const all = this.dataSource.getAll();
        return all.map((e) => new HabitStatusRecord(e.habitId, e.statuses));
    }
}
