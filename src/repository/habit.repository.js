import {JsonListDataSource} from '../datasources/index.js';
import {generateRandomId} from '../utils/index.js';

export class HabitRepository {
    constructor(dataSource = new JsonListDataSource('habits.json')) {
        this.dataSource = dataSource;
    }

    /**
     * @param {Habit} habit
     */
    add(habit) {
        this.dataSource.add(habit.copyWith({id: generateRandomId()}));
    }

    /**
     * @param {Habit} habit
     */
    update(habit) {
        const databaseHabit = this.dataSource.getByProperty('id', habit.id);
        if (!databaseHabit) {
            throw new Error(`Habit with id ${habit.id} not found`);
        }
        this.dataSource.update(databaseHabit, habit);
    }

    getAll() {
        return this.dataSource.getAll();
    }

    getById(id) {
        const all = this.dataSource.getAll();
        return all.find((item) => item.id === id);
    }

    delete(id) {
        console.log('delete', id);
        const databaseHabit = this.dataSource.getByProperty('id', id);
        if (!databaseHabit) {
            throw new Error(`Habit with id ${id} not found`);
        }
        this.dataSource.remove(databaseHabit);
    }
}
