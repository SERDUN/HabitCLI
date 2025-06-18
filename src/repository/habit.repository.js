import {JsonListDataSource} from '../datasources/index.js';
import {generateRandomId} from '../utils/index.js';
import {Habit} from '../models/index.js';
import {HabitEntity} from '../entities/index.js';

export class HabitRepository {
	constructor(dataSource = new JsonListDataSource('habits.json')) {
		this.dataSource = dataSource;
	}

	/**
	 * Adds a new habit to the storage and returns the full model with generated ID.
	 *
	 * @param {Habit} habit - The domain model to add.
	 * @returns {Habit}
	 */
	add(habit) {
		const id = generateRandomId();
		const modelWithId = habit.copyWith({id});
		const entity = this.#toEntity(modelWithId);
		this.dataSource.add(entity);
		return modelWithId;
	}

	/**
	 * Updates an existing habit in the storage.
	 *
	 * @param {Habit} habit - The domain model with updated values.
	 * @throws {Error} If the habit is not found.
	 */
	update(habit) {
		this.#validateId(habit.id);

		const existing = this.dataSource.getByProperty('id', habit.id);
		if (!existing) {
			throw new Error(`Habit with id ${habit.id} not found`);
		}

		const entity = this.#toEntity(habit);
		this.dataSource.update(existing, entity);
	}

	/**
	 * Returns all habits in domain model format.
	 *
	 * @returns {Habit[]}
	 */
	getAll() {
		return this.dataSource.getAll().map((entity) => this.#toModel(entity));
	}

	/**
	 * Finds a habit by its ID.
	 *
	 * @param {string} id
	 * @returns {Habit | undefined}
	 */
	getById(id) {
		this.#validateId(id);
		const entity = this.dataSource.getByProperty('id', id);
		return entity ? this.#toModel(entity) : undefined;
	}

	/**
	 * Deletes a habit by its ID.
	 *
	 * @param {string} id
	 * @throws {Error} If the habit is not found.
	 */
	delete(id) {
		this.#validateId(id);

		const entity = this.dataSource.getByProperty('id', id);
		if (!entity) {
			throw new Error(`Habit with id ${id} not found`);
		}

		this.dataSource.remove(entity);
	}

	/**
	 * Maps Habit entity (JSON format) to domain Habit model.
	 * @param {HabitEntity} entity
	 * @returns {Habit}
	 */
	#toModel(entity) {
		return new Habit(entity.id, entity.title, entity.freq);
	}

	/**
	 * Maps Habit model to entity for storage.
	 * @param {Habit} model
	 * @returns {HabitEntity}
	 */
	#toEntity(model) {
		return new HabitEntity(model.id, model.title, model.freq, model.updatedAt.toISOString());
	}

	/**
	 * Validates that the given ID is a non-empty string.
	 * @param {string} id
	 * @throws {TypeError}
	 */
	#validateId(id) {
		if (typeof id !== 'string' || id.trim() === '') {
			throw new TypeError('Habit ID must be a non-empty string');
		}
	}
}
