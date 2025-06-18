import {HabitManagerServices} from './habit_manager.services.js';
import {BaseController, validateOrFail} from '../../utils/index.js';

/**
 * Controller for managing habit-related commands.
 * Registers CLI commands and connects them to habit service logic.
 */
export class HabitManagerController extends BaseController {
    static #idSchema = {
        id: {required: true, type: 'string'}
    };

    static #createSchema = {
        name: {required: true, type: 'string'},
        freq: {required: true, type: 'string'}
    };

    static #updateSchema = {
        id: {required: true, type: 'string'},
        name: {required: true, type: 'string'},
        freq: {required: true, type: 'string'}
    };

    /**
     * @param {HabitManagerServices} service - The habit manager service instance.
     */
    constructor(service = new HabitManagerServices()) {
        super();
        this.service = service;
        this.#registerCommands();
    }

    /**
     * Registers CLI commands with their corresponding handler methods.
     * @private
     */
    #registerCommands() {
        this.register('add', this.addHabit.bind(this));
        this.register('update', this.updateHabit.bind(this));
        this.register('list', this.listHabits.bind(this));
        this.register('get', this.findHabitById.bind(this));
        this.register('delete', this.deleteHabitById.bind(this));
    }

    /**
     * Creates a new habit.
     * @param {{name: string, freq: string}} args - Habit creation data.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    addHabit(args, {renderer}) {
        if (!validateOrFail(HabitManagerController.#createSchema, args, (errors) => {
            renderer.error(errors.join('; '));
        })) return;

        const habit = this.service.addHabit(args.name, args.freq);
        renderer.success('Habit successfully added!');
        renderer.section('Habit Info');
        renderer.table([habit]);
    }

    /**
     * Lists all existing habits.
     * @param {*} _args - Not used.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    listHabits(_, {renderer}) {
        const habits = this.service.getAllHabits();

        if (!habits.length) {
            renderer.warning?.('No habits found. Use `add` command to create one.');
            return;
        }

        renderer.section?.('Your Habits');
        renderer.details?.(`Total habits: ${habits.length}`);
        renderer.table(habits);
    }

    /**
     * Finds a habit by its ID.
     * @param {{id: string}} args - The ID of the habit to retrieve.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    findHabitById(args, {renderer}) {
        if (!validateOrFail(HabitManagerController.#idSchema, args, (errors) => {
            renderer.error(errors.join('; '));
        })) return;

        const habit = this.service.getHabitById(args.id);
        if (!habit) {
            renderer?.warning?.(`No habit found with ID: ${args.id}`);
            return;
        }
        renderer.success(`Habit with ID ${args.id}:`);
        renderer.table([habit]);
    }

    /**
     * Updates a habit by its ID.
     * @param {{id: string, name: string, freq: string}} args - Habit update data.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    updateHabit(args, {renderer}) {
        if (!validateOrFail(HabitManagerController.#updateSchema, args, (errors) => {
            renderer.error(errors.join('; '));
        })) return;

        const habit = this.service.updateHabit(args.id, args.name, args.freq);
        renderer.success('Habit successfully updated!');
        renderer.section('Habit Info');
        renderer.table([habit]);
    }

    /**
     * Deletes a habit by its ID.
     * @param {{id: string}} args - The ID of the habit to delete.
     * @param {{renderer: any}} context - Rendering context for CLI output.
     */
    deleteHabitById(args, {renderer}) {
        if (!validateOrFail(HabitManagerController.#idSchema, args, (errors) => {
            renderer.error(errors.join('; '));
        })) return;

        const habit = this.service.getHabitById(args.id);
        if (!habit) {
            renderer?.warning?.(`No habit found with ID: ${args.id}`);
            return;
        }

        this.service.deleteHabit(args.id);
        renderer?.success?.(`Habit with ID ${args.id} deleted.`);
    }
}
