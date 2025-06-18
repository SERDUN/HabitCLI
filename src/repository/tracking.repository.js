import {JsonListDataSource} from '../datasources/index.js';
import {HabitStatusRecord} from '../models/index.js';
import {HabitStatusRecordEntity} from '../entities/index.js';
import {HabitStatusEntity} from '../entities/index.js';
import {HabitStatus} from '../models/index.js';

export class TrackingRepository {
	constructor(trackingJsonDatasource = new JsonListDataSource('tracking.json'), habitJsonDatasource = new JsonListDataSource('habits.json')) {
		this.trackingJsonDatasource = trackingJsonDatasource;
		this.habitJsonDatasource = habitJsonDatasource;
	}

	/**
	 * Retrieves the full status history for a given habit ID.
	 *
	 * @param {string} habitId - The unique identifier of the habit.
	 * @returns {HabitStatusRecord | null} The status record, or null if habit or tracking data is not found.
	 * @throws {TypeError} If habitId is not a non-empty string.
	 */
	getStatusesByHabitId(habitId) {
		this.#validateHabitId(habitId);

		const entity = this.trackingJsonDatasource.getByProperty('habitId', habitId);
		return entity ? this.#toModel(entity) : null;
	}

	/**
	 * Adds a new status entry for the specified habit.
	 *
	 * @param {string} habitId - The unique identifier of the habit.
	 * @param {HabitStatus} status - The status to be recorded.
	 * @throws {TypeError} If habitId or status is invalid.
	 */
	addStatus(habitId, status) {
		console.log('Adding status for habit:', habitId, 'with status:', status);
		const newStatus = this.#toStatusEntity(status);
		const existing = HabitStatusRecordEntity.fromJSON(this.trackingJsonDatasource.getByProperty('habitId', habitId));

		if (!existing) {
			this.trackingJsonDatasource.add(new HabitStatusRecordEntity(habitId, [newStatus]));
			return;
		}
		const updated = existing.cloneWith(newStatus);
		this.trackingJsonDatasource.update(existing, updated);
	}

	/**
	 * Retrieves status records for all habits that have tracking data.
	 *
	 * @returns {HabitStatusRecord[]} An array of status records. Habits without metadata are skipped.
	 */
	getAllStatuses() {
		const allEntities = this.trackingJsonDatasource.getAll();

		return allEntities
			.map((entity) => this.#toModel(entity))
			.filter(Boolean);
	}

	/**
	 * Validates habit ID.
	 * @param {string} habitId
	 * @private
	 */
	#validateHabitId(habitId) {
		if (typeof habitId !== 'string' || habitId.trim() === '') {
			throw new TypeError('habitId must be a non-empty string');
		}
	}

	/**
	 * Maps a persistence entity to a domain model (includes habit metadata).
	 * @param {HabitStatusRecordEntity} entity
	 * @returns {HabitStatusRecord | null}
	 * @private
	 */
	#toModel(entity) {
		const habit = this.habitJsonDatasource.getByProperty('id', entity.habitId);
		if (!habit) return null;

		return new HabitStatusRecord(habit, entity.statuses.map(s => new HabitStatus(s.date, s.status)));
	}

	#toStatusEntity(status) {
		console.log('Converting status to entity:', status);
		return new HabitStatusEntity(status.date, status.status);
	}
}