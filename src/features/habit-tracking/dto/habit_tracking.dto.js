/**
 * Represents a row of habit completion data for table rendering.
 */
export class CompletionStatsRow {
    /**
     * @param {string} habitId
     * @param {string} habitTitle
     * @param {number} completedDays
     * @param {number} completionPercent
     */
    constructor(habitId, habitTitle, completedDays, completionPercent) {
        this.habitId = habitId;
        this.habitTitle = habitTitle;
        this.completedDays = completedDays;
        this.completionPercent = completionPercent;
    }

    /**
     * Returns a plain object ready for CLI table rendering.
     * @returns {{ HabitID: string, 'Completed Days (30d)': number, 'Completion %': string }}
     */
    toTableRow() {
        return {
            HabitID: this.habitId,
            Title: this.habitTitle,
            'Completed Days (30d)': this.completedDays,
            'Completion %': this.completionPercent.toFixed(2),
        };
    }
}
