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
}
