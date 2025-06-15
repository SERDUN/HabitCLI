/**
 * @param {string} id - Unique identifier of the habit
 * @param {string} title - The name of the habit
 * @param {'daily' | 'weekly' | 'monthly'} freq - Frequency of the habit
 * @param {Date} [updatedAt=new Date()] - The date when the habit was created
 */
export default class Habit {
    constructor(id, title, freq, updatedAt = new Date()) {
        this.id = id;
        this.title = title;
        this.freq = freq;
        this.updatedAt = updatedAt;
    }

    /**
     * Factory method to create a habit without an id
     * @param {string} title
     * @param {'daily' | 'weekly' | 'monthly'} freq
     * @returns {Habit}
     */
    static create(title, freq) {
        return new Habit(undefined, title, freq);
    }

    /**
     * Returns a new Habit with overridden fields
     * @param {Object} fields
     * @param {string | number} [fields.id]
     * @param {string} [fields.title]
     * @param {'daily' | 'weekly' | 'monthly'} [fields.freq]
     * @param {Date} [fields.updatedAt]
     * @returns {Habit}
     */
    copyWith({id, title, freq, updatedAt} = {}) {
        return new Habit(
            id ?? this.id,
            title ?? this.title,
            freq ?? this.freq,
            updatedAt ?? this.updatedAt
        );
    }
}
