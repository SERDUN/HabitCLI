import {HabitManagerServices} from './habit_manager.services.js';
import {BaseController} from '../../utils/index.js';

export class HabitManagerController extends BaseController {
    constructor(service = new HabitManagerServices()) {
        super();
        this.service = service;

        this.register('add', 'addHabit');
        this.register('update', 'updateHabit');
        this.register('list', 'getAllHabits');
        this.register('get', 'getHabitById');
    }

    addHabit(args) {
        console.log('Add habit called with args:', args);
    }

    updateHabit(oldHabit, newHabit) {
        return this.service.updateHabit(oldHabit, newHabit);
    }

    getAllHabits() {
        return this.service.getAllHabits();
    }

    getHabitById(id) {
        return this.service.getHabitById(id);
    }
}
