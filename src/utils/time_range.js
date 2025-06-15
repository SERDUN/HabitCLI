export const TimeRange = {
    isToday(isoString) {
        const inputDate = new Date(isoString);
        const now = new Date();

        return inputDate.getFullYear() === now.getFullYear() && inputDate.getMonth() === now.getMonth() && inputDate.getDate() === now.getDate();
    },

    isThisWeek(isoString) {
        const inputDate = new Date(isoString);
        const now = new Date();

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return inputDate >= TimeRange.startOfDay(startOfWeek) && inputDate <= TimeRange.endOfDay(endOfWeek);
    },

    isThisMonth(isoString) {
        const inputDate = new Date(isoString);
        const now = new Date();

        return inputDate.getFullYear() === now.getFullYear() && inputDate.getMonth() === now.getMonth();
    },

    isInCurrentRange(freq, isoString) {
        switch (freq) {
            case 'day':
                return TimeRange.isToday(isoString);
            case 'week':
                return TimeRange.isThisWeek(isoString);
            case 'monthly':
                return TimeRange.isThisMonth(isoString);
            default:
                throw new Error(`Unsupported frequency: ${freq}`);
        }
    },

    getTotalDaysInRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startOnlyDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endOnlyDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        const msPerDay = 1000 * 60 * 60 * 24;
        const diff = Math.round((endOnlyDate - startOnlyDate) / msPerDay);

        return diff + 1;
    },

    startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    },

    endOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }
};
