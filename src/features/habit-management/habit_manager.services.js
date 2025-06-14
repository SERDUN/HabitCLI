import {HabitRepository} from "../../repository/index.js";

export class HabitManagerServices {
    constructor(repository = new HabitRepository()) {
        this.repository = repository;
    }

    addHabit(habit) {
        this.repository.add(habit);
    }

    updateHabit(oldHabit, newHabit) {
        this.repository.update(oldHabit, newHabit);
    }

    getAllHabits() {
        return this.repository.getAll();
    }

    getHabitById(id) {
        return this.repository.getById(id);
    }
}
