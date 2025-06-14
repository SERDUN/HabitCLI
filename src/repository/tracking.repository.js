import {JsonListDataSource} from '../datasources/index.js';

export class TrackingRepository {
    constructor(dataSource = new JsonListDataSource('tracking.json')) {
        this.dataSource = dataSource;
    }

    async getStatusesByHabitId(habitId) {
        const all = await this.dataSource.getAll();
        return all.find((entry) => entry.habitId === habitId) || {habitId, statuses: []};
    }

    async addStatus(habitId, statusEntry) {
        const all = await this.dataSource.getAll();
        let entry = all.find((e) => e.habitId === habitId);

        if (!entry) {
            entry = {habitId, statuses: []};
            all.push(entry);
        }

        entry.statuses.push(statusEntry);
        await this.dataSource.replaceAll(all);
    }

    async updateStatus(habitId, date, newStatus) {
        const all = await this.dataSource.getAll();
        const entry = all.find((e) => e.habitId === habitId);
        if (!entry) return;

        const status = entry.statuses.find((s) => s.date === date);
        if (status) {
            status.status = newStatus;
            await this.dataSource.replaceAll(all);
        }
    }

    async getAllStatuses() {
        return await this.dataSource.getAll();
    }
}
