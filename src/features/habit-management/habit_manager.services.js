import {HabitRepository} from '../../repository/index.js';
import {Habit} from '../../models/index.js';

/**
 * Service class for managing habit-related operations.
 * Acts as an intermediary between the controller and the repository.
 */
export class HabitManagerServices {
	/**
	 * @param {HabitRepository} repository - The repository handling habit data storage.
	 */
	constructor(repository = new HabitRepository()) {
		this.repository = repository;
	}

	/**
	 * Creates and adds a new habit.
	 * @param {string} title - The title or name of the habit.
	 * @param {'day'|'week'|'monthly'} frequency - The frequency of the habit.
	 * @returns {Habit} The created habit.
	 */
	addHabit(title, frequency) {
		return this.repository.add(Habit.create(title, frequency));
	}

	/**
	 * Updates an existing habit by ID.
	 * @param {string} id - The ID of the habit to update.
	 * @param {string} title - The updated title.
	 * @param {'day'|'week'|'monthly'} frequency - The updated frequency.
	 * @returns {void} The updated habit.
	 */
	updateHabit(id, title, frequency) {
		return this.repository.update(new Habit(id, title, frequency));
	}

	/**
	 * Retrieves all habits.
	 * @returns {Habit[]} Array of all stored habits.
	 */
	getAllHabits() {
		return this.repository.getAll();
	}

	/**
	 * Retrieves a habit by its ID.
	 * @param {string} id - The ID of the habit.
	 * @returns {Habit|null} The habit if found, or null.
	 */
	getHabitById(id) {
		return this.repository.getById(id);
	}

	/**
	 * Deletes a habit by its ID.
	 * @param {string} id - The ID of the habit to delete.
	 * @returns {void} True if deletion was successful, otherwise false.
	 */
	deleteHabit(id) {
		return this.repository.delete(id);
	}
}