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

    addHabit(args, {renderer}) {
        const habit = this.service.addHabit(args.name, args.freq);
        renderer.success('Habit successfully added!');
        renderer.details(`ID: ${habit.id}`);
        renderer.details(`Title: ${habit.title}`);
        renderer.details(`Frequency: ${habit.freq}`);
        renderer.details(`Created At: ${habit.updatedAt}`);
        renderer.section('Habit Info');
        renderer.table([habit]);
    }

    updateHabit(args) {
        return this.service.updateHabit(args.id, args.name, '', '');
    }

    getAllHabits(_, {renderer}) {
        const habits = this.service.getAllHabits();

        if (!habits.length) {
            renderer.warning?.('No habits found. Use `add` command to create one.');
            return;
        }

        renderer.section?.('Your Habits');
        renderer.details?.(`Total habits: ${habits.length}`);
        renderer.table(habits);
    }

    getHabitById(id) {
        return this.service.getHabitById(id);
    }

    deleteHabit(args) {
        return this.service.deleteHabit(args.id);
    }
}
