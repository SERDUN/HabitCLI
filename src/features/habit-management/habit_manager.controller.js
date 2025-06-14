import {HabitManagerServices} from "./habit_manager.services.js";

export class HabitManagerController {
    constructor(service = new HabitManagerServices()) {
        this.service = service;
    }

    addHabit(habit) {
        this.service.addHabit(habit);
    }

    updateHabit(oldHabit, newHabit) {
        this.service.updateHabit(oldHabit, newHabit);
    }

    getAllHabits() {
        return this.service.getAllHabits();
    }

    getHabitById(id) {
        return this.service.getHabitById(id);
    }
}
