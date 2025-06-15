/**
 * @param {string | number} id - Unique identifier of the habit
 * @param {string} title - The name of the habit
 * @param {string} description - A short description of the habit
 * @param {StatusType} status - The current status of the habit
 * @param {Date} [createdAt=new Date()] - The date when the habit was created
 */
export default class Habit {
    constructor(id, title, description, status, createdAt = new Date(),) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }

    /**
     * Factory method to create a habit without an id
     * @param {string} title
     * @param {string} description
     * @param {StatusType} status
     * @returns {Habit}
     */
    static create(title, description, status) {
        return new Habit(undefined, title, description, status);
    }

    /**
     * Returns a new Habit with overridden fields
     * @param {Object} fields
     * @param {string | number} [fields.id]
     * @param {string} [fields.title]
     * @param {string} [fields.description]
     * @param {StatusType} [fields.status]
     * @param {Date} [fields.createdAt]
     * @returns {Habit}
     */
    copyWith({id, title, description, status, createdAt} = {}) {
        return new Habit(
            id ?? this.id,
            title ?? this.title,
            description ?? this.description,
            status ?? this.status,
            createdAt ?? this.createdAt
        );
    }
}
