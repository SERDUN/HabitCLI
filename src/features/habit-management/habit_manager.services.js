import {HabitRepository} from '../../repository/index.js';
import Habit from '../../models/habit.model.js';

export class HabitManagerServices {
    constructor(repository = new HabitRepository()) {
        this.repository = repository;
    }

    addHabit(title, description, frequency) {
        this.repository.add(Habit.create(title, description, frequency));
    }

    updateHabit(id, title, description, frequency) {
        this.repository.update(new Habit(id, title, description, frequency));
    }

    getAllHabits() {
        return this.repository.getAll();
    }

    getHabitById(id) {
        return this.repository.getById(id);
    }

    deleteHabit(id) {
        return this.repository.delete(id);
    }
}
