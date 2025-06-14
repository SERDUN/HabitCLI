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
        this.register('delete', 'deleteHabit');
    }

    addHabit(args) {
        return this.service.addHabit(args.name, '', '');
    }

    updateHabit(args) {
        return this.service.updateHabit(args.id, args.name, '', '');
    }

    getAllHabits(_, {renderer}) {
        const habits = this.service.getAllHabits();
        renderer?.log?.(habits);
    }

    getHabitById(id) {
        return this.service.getHabitById(id);
    }

    deleteHabit(args) {
        return this.service.deleteHabit(args.id);
    }
}
