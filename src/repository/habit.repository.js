import {JsonListDataSource} from '../datasources/index.js';

export class HabitRepository {
    constructor(dataSource = new JsonListDataSource('habits.json')) {
        this.dataSource = dataSource;
    }

    getAll() {
        return this.dataSource.getAll();
    }

    getById(id) {
        const all = this.dataSource.getAll();
        return all.find((item) => item.id === id);
    }

    add(habit) {
        this.dataSource.add(habit);
    }

    update(oldHabit, newHabit) {
        this.dataSource.update(oldHabit, newHabit);
    }
}
